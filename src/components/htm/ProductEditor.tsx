import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import {
  allMaterials,
  baseUrlBlog,
  categories,
  collections,
} from "../../utils/constants"
import { responseError } from "../../utils/http"
import type { ProductT } from "../../utils/types"

type VariantDraft = { size: string; quantity: string }
type ImageDraft = { file: File; preview: string }
const categoryChoices = [
  ...new Map(
    [...categories("English"), ...collections].map(category => [
      category.route,
      { route: category.route, title: category.title },
    ]),
  ).values(),
]
const initialDraft = (product?: ProductT) => ({
  name: product?.name || "",
  category: product?.category || "",
  subCategory: product?.subCategory || "",
  price: product?.price ? String(product.price) : "",
  weight: product?.weight ? String(product.weight) : "",
  color: product?.color || "",
  material: product?.material || "",
  desc: product?.desc || "",
})

export default function ProductEditor({
  initialProduct,
  productId,
}: {
  initialProduct?: ProductT
  productId?: string
}) {
  const token = useAppSelector(state => state.token)
  const login = useAppSelector(state => state.user.profile.login)
  const [draft, setDraft] = useState(() => initialDraft(initialProduct))
  const [variants, setVariants] = useState<VariantDraft[]>(() =>
    initialProduct?.sizeQuantities?.length
      ? initialProduct.sizeQuantities.map(variant => ({
          size: variant.size,
          quantity: String(variant.quantity),
        }))
      : [{ size: "Standard", quantity: String(initialProduct?.quantity ?? 0) }],
  )
  const [existingImages, setExistingImages] = useState(
    initialProduct?.imageUrls || [],
  )
  const [newImages, setNewImages] = useState<ImageDraft[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [createdId, setCreatedId] = useState("")
  const errorRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const previewUrls = useRef(new Set<string>())
  const uploadedImages = useRef(new Map<File, string>())

  useEffect(() => {
    const urls = previewUrls.current
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])
  useEffect(() => {
    if (error) errorRef.current?.focus()
  }, [error])

  const field =
    (name: keyof typeof draft) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setDraft(previous => ({ ...previous, [name]: event.target.value }))
      setMessage("")
    }
  const addImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (existingImages.length + newImages.length + files.length > 10) {
      setError("Use no more than 10 product images.")
      event.target.value = ""
      return
    }
    if (
      files.some(
        file =>
          !["image/jpeg", "image/png", "image/gif"].includes(file.type) ||
          file.size > 5 * 1024 * 1024 ||
          file.size === 0,
      )
    ) {
      setError("Choose JPEG, PNG or GIF images under 5 MB each.")
      event.target.value = ""
      return
    }
    setError("")
    setNewImages(previous => [
      ...previous,
      ...files.map(file => {
        const preview = URL.createObjectURL(file)
        previewUrls.current.add(preview)
        return { file, preview }
      }),
    ])
    event.target.value = ""
  }
  const removeNewImage = (image: ImageDraft) => {
    URL.revokeObjectURL(image.preview)
    previewUrls.current.delete(image.preview)
    uploadedImages.current.delete(image.file)
    setNewImages(previous => previous.filter(item => item !== image))
  }
  const uploadImage = async (file: File) => {
    const previous = uploadedImages.current.get(file)
    if (previous) return previous
    const body = new FormData()
    body.append("file", file)
    const response = await fetch(`${baseUrlBlog}/post/file/upload`, {
      method: "POST",
      headers: { Authorization: token },
      body,
    })
    if (!response.ok)
      throw await responseError(
        response,
        `Could not upload ${file.name}. Please try again.`,
      )
    const text = await response.text()
    let url = text.trim()
    try {
      const data: unknown = JSON.parse(text)
      if (typeof data === "string") url = data
      else if (
        data &&
        typeof data === "object" &&
        "url" in data &&
        typeof data.url === "string"
      )
        url = data.url
    } catch {
      /* The upload endpoint may return a plain URL. */
    }
    if (!/^https?:\/\//i.test(url))
      throw new Error(
        "Image storage returned an invalid image URL. Please try again.",
      )
    uploadedImages.current.set(file, url)
    return url
  }

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (busy) return
    setError("")
    setMessage("")
    const sizes = variants.map(variant => variant.size.trim())
    if (!draft.name.trim() || !draft.category.trim()) {
      setError("Enter a product name and category.")
      return
    }
    if (
      new Set(sizes.map(size => size.toLowerCase())).size !== sizes.length ||
      sizes.some(size => !size)
    ) {
      setError("Each product option must have a unique name.")
      return
    }
    if (
      variants.some(
        variant =>
          variant.quantity.trim() === "" ||
          !Number.isInteger(Number(variant.quantity)) ||
          Number(variant.quantity) < 0 ||
          Number(variant.quantity) > 2147483647,
      )
    ) {
      setError(
        "Enter a whole-number stock quantity of zero or more for every option.",
      )
      return
    }
    if (
      !Number.isFinite(Number(draft.price)) ||
      Number(draft.price) <= 0 ||
      !Number.isFinite(Number(draft.weight)) ||
      Number(draft.weight) <= 0 ||
      Number(draft.weight) > 30000
    ) {
      setError(
        "Enter a positive price and a shipping weight of up to 30,000 grams.",
      )
      return
    }
    setBusy(true)
    try {
      const imageUrls = [...existingImages]
      for (const image of newImages)
        imageUrls.push(await uploadImage(image.file))
      const payload = {
        name: draft.name.trim(),
        category: draft.category.trim(),
        subCategory: draft.subCategory.trim(),
        price: Number(draft.price),
        weight: Number(draft.weight),
        color: draft.color.trim(),
        material: draft.material.trim(),
        desc: draft.desc.trim(),
        imageUrls,
        sizeQuantities: variants.map(variant => ({
          size: variant.size.trim(),
          quantity: Number(variant.quantity),
        })),
      }
      const response = await fetch(
        `${baseUrlBlog}/post/${encodeURIComponent(productId || login)}`,
        {
          method: productId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify(payload),
        },
      )
      if (!response.ok)
        throw await responseError(
          response,
          "The product could not be saved. Your changes are still available to retry.",
        )
      const saved = (await response.json()) as ProductT
      setMessage(
        productId ? "Product changes saved." : "Product created successfully.",
      )
      if (!productId) setCreatedId(saved.id || "created")
      setExistingImages(imageUrls)
      newImages.forEach(image => URL.revokeObjectURL(image.preview))
      previewUrls.current.clear()
      uploadedImages.current.clear()
      setNewImages([])
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : "The product could not be saved. Please try again.",
      )
    } finally {
      setBusy(false)
    }
  }

  const resetNewProduct = () => {
    setDraft(initialDraft())
    setVariants([{ size: "Standard", quantity: "0" }])
    setExistingImages([])
    setNewImages([])
    setCreatedId("")
    setMessage("")
    setError("")
  }
  if (createdId)
    return (
      <section className="container py-5">
        <h1>Product created</h1>
        <p className="alert alert-success" role="status">
          {message}
        </p>
        <div className="d-flex flex-wrap gap-3">
          {createdId !== "created" && (
            <Link
              className="btn"
              to={`/product/${encodeURIComponent(createdId)}`}
            >
              View product
            </Link>
          )}
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={resetNewProduct}
          >
            Add another product
          </button>
          <Link className="btn btn-outline-secondary" to="/account">
            Back to account
          </Link>
        </div>
      </section>
    )

  return (
    <section className="container py-5" aria-labelledby="product-editor-title">
      <h1 id="product-editor-title">
        {productId ? "Edit product" : "Add product"}
      </h1>
      <p>
        Keep product options, stock and shipping weight accurate before
        publishing.
      </p>
      {error && (
        <div
          ref={errorRef}
          className="alert alert-danger"
          role="alert"
          tabIndex={-1}
        >
          {error}
        </div>
      )}
      {message && (
        <p className="alert alert-success" role="status">
          {message}{" "}
          <Link to={`/product/${encodeURIComponent(productId || "")}`}>
            View product
          </Link>
        </p>
      )}
      <form onSubmit={event => void save(event)}>
        <fieldset disabled={busy}>
          <legend className="visually-hidden">Product details</legend>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label htmlFor="editor-name" className="form-label">
                Product name
              </label>
              <input
                id="editor-name"
                className="form-control"
                required
                maxLength={200}
                value={draft.name}
                onChange={field("name")}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="editor-category" className="form-label">
                Category
              </label>
              <select
                id="editor-category"
                className="form-select"
                required
                value={draft.category}
                onChange={field("category")}
              >
                <option value="">Choose a category</option>
                {draft.category &&
                  !categoryChoices.some(
                    category => category.route === draft.category,
                  ) && <option value={draft.category}>{draft.category}</option>}
                {categoryChoices.map(category => (
                  <option key={category.route} value={category.route}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="editor-subcategory" className="form-label">
                Subcategory (optional)
              </label>
              <input
                id="editor-subcategory"
                className="form-control"
                maxLength={100}
                placeholder="e.g. tiles"
                value={draft.subCategory}
                onChange={field("subCategory")}
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="editor-price" className="form-label">
                Price (USD)
              </label>
              <input
                id="editor-price"
                className="form-control"
                required
                type="number"
                min="0.01"
                step="0.01"
                value={draft.price}
                onChange={field("price")}
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="editor-weight" className="form-label">
                Shipping weight (grams)
              </label>
              <input
                id="editor-weight"
                className="form-control"
                required
                type="number"
                min="0.01"
                max="30000"
                step="0.01"
                value={draft.weight}
                onChange={field("weight")}
                aria-describedby="editor-weight-help"
              />
              <p id="editor-weight-help" className="small text-muted mt-1">
                Packed weight per item, up to 30,000 g.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="editor-color" className="form-label">
                Color
              </label>
              <input
                id="editor-color"
                className="form-control"
                maxLength={100}
                value={draft.color}
                onChange={field("color")}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="editor-material" className="form-label">
                Material
              </label>
              <input
                id="editor-material"
                className="form-control"
                list="editor-material-options"
                maxLength={100}
                value={draft.material}
                onChange={field("material")}
              />
              <datalist id="editor-material-options">
                {allMaterials.map(material => (
                  <option key={material} value={material} />
                ))}
              </datalist>
            </div>
            <div className="col-12">
              <label htmlFor="editor-description" className="form-label">
                Description
              </label>
              <textarea
                id="editor-description"
                className="form-control"
                rows={4}
                maxLength={10000}
                value={draft.desc}
                onChange={field("desc")}
              />
            </div>
            <div className="col-12">
              <fieldset className="border rounded p-3">
                <legend className="float-none w-auto px-2 fs-5">
                  Options and stock
                </legend>
                <p className="small text-muted">
                  Use “Standard” for a product with one option. Names must be
                  unique.
                </p>
                {variants.map((variant, index) => (
                  <div className="row g-2 mb-3" key={index}>
                    <div className="col-12 col-sm-5">
                      <label
                        htmlFor={`editor-size-${index}`}
                        className="form-label"
                      >
                        Option {index + 1}
                      </label>
                      <input
                        id={`editor-size-${index}`}
                        className="form-control"
                        required
                        maxLength={50}
                        value={variant.size}
                        onChange={event =>
                          setVariants(previous =>
                            previous.map((item, position) =>
                              position === index
                                ? { ...item, size: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                    </div>
                    <div className="col-8 col-sm-4">
                      <label
                        htmlFor={`editor-stock-${index}`}
                        className="form-label"
                      >
                        Stock for option {index + 1}
                      </label>
                      <input
                        id={`editor-stock-${index}`}
                        className="form-control"
                        required
                        type="number"
                        min={0}
                        max={2147483647}
                        step={1}
                        value={variant.quantity}
                        onChange={event =>
                          setVariants(previous =>
                            previous.map((item, position) =>
                              position === index
                                ? { ...item, quantity: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                    </div>
                    <div className="col-4 col-sm-3 d-flex align-items-end">
                      <button
                        type="button"
                        className="btn btn-outline-danger w-100"
                        disabled={variants.length === 1}
                        onClick={() =>
                          setVariants(previous =>
                            previous.filter(
                              (_, position) => position !== index,
                            ),
                          )
                        }
                        aria-label={`Remove option ${index + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setVariants(previous => [
                      ...previous,
                      { size: "", quantity: "0" },
                    ])
                  }
                >
                  Add option
                </button>
              </fieldset>
            </div>
            <div className="col-12">
              <label htmlFor="editor-images" className="form-label">
                Product images
              </label>
              <input
                ref={fileRef}
                id="editor-images"
                className="form-control"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                multiple
                onChange={addImages}
                aria-describedby="editor-images-help"
              />
              <p className="small text-muted mt-1" id="editor-images-help">
                Up to 10 JPEG, PNG or GIF images, under 5 MB each. The first
                image appears in the shop.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-3">
                {existingImages.map((url, index) => (
                  <figure className="m-0" key={`${url}-${index}`}>
                    <img
                      src={url}
                      alt={`Product image ${index + 1}`}
                      width={110}
                      height={110}
                      className="border rounded object-fit-contain"
                    />
                    <figcaption>
                      <button
                        type="button"
                        className="btn btn-outline-danger mt-2"
                        onClick={() =>
                          setExistingImages(previous =>
                            previous.filter(
                              (_, position) => position !== index,
                            ),
                          )
                        }
                        aria-label={`Remove existing image ${index + 1}`}
                      >
                        Remove
                      </button>
                    </figcaption>
                  </figure>
                ))}
                {newImages.map((image, index) => (
                  <figure className="m-0" key={image.preview}>
                    <img
                      src={image.preview}
                      alt={`New image ${index + 1}: ${image.file.name}`}
                      width={110}
                      height={110}
                      className="border rounded object-fit-contain"
                    />
                    <figcaption>
                      <button
                        type="button"
                        className="btn btn-outline-danger mt-2"
                        onClick={() => removeNewImage(image)}
                        aria-label={`Remove new image ${index + 1}`}
                      >
                        Remove
                      </button>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-end gap-3 mt-4">
            <Link className="btn btn-outline-secondary" to="/account">
              Back to account
            </Link>
            <button type="submit" className="btn" disabled={busy}>
              {busy
                ? "Saving product…"
                : productId
                  ? "Save changes"
                  : "Create product"}
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  )
}
