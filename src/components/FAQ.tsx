import React, { useEffect, useMemo, useState } from "react";
import {
  collections,
  countries,
  ringSizes,
  clothesSizes,
  allMaterials,
  adminInfo,
  links,
} from "../utils/constants"; // ← adjust path if needed

// ----------------------------------------------------
// FAQ (Bootstrap version) — search, category filter,
// highlight, multi-open accordion, deep-link via hash,
// Expand/Collapse All, accessible markup.
// Drop in as <FAQ />. Works with Bootstrap 5.
// ----------------------------------------------------

// ---- Types ----
type Faq = {
  id: string;
  question: string;
  answer: React.ReactNode | string;
  category: string;
};

// ---- Helpers (local) ----
const slug = (s: string) =>
  s.toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const re = new RegExp(`(${escapeRegex(q)})`, "ig");
  return text.split(re).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="px-1 py-0">
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

const previewList = (arr: string[], n = 8) =>
  arr.length <= n ? arr.join(", ") : `${arr.slice(0, n).join(", ")} and more…`;

// Build dynamic FAQ data from your constants.ts
function buildFaqData(): Faq[] {
  // Collections summary
  const collectionsCount = collections.length;
  const collectionNames = collections.map((c) => c.title);
  const collectionPreview = previewList(collectionNames, 6);

  // Countries summary
  const countriesCount = countries.length;
  const countriesPreview = previewList(countries, 12);

  // Size info
  const ringSizesCount = ringSizes.length;
  const ringSizeRange =
    ringSizesCount > 0
      ? `${ringSizes[0].size}–${ringSizes[ringSizes.length - 1].size}`
      : "various sizes";
  const clothesSizeLabels =
    clothesSizes?.map((c) => c.name || c.value).join(", ") || "XS–XL";

  // Materials
  const matsPreview = previewList(allMaterials, 10);

  // Links (optional)
  const facebook = links.find((l) => l.name === "facebook")?.route;
  const instagram = links.find((l) => l.name === "instagram")?.route;
  const youtube = links.find((l) => l.name === "youtube")?.route;

  return [
    // SHIPPING
    {
      id: "ship-destinations",
      question: "Do you ship to my country?",
      answer: (
        <>
          Yes—we currently ship to <strong>{countriesCount}+</strong> countries, including{" "}
          {countriesPreview}. At checkout, select your destination to see available options and
          rates. If your country is missing, please contact us.
        </>
      ),
      category: "Shipping",
    },
    {
      id: "ship-times",
      question: "How long does shipping take?",
      answer:
        "Delivery times vary by destination and shipping method. You’ll see estimated delivery windows at checkout. Once shipped, we’ll email you a tracking link.",
      category: "Shipping",
    },
    {
      id: "ship-tracking",
      question: "How do I track my shipment?",
      answer:
        "As soon as your order ships, you’ll receive an email with a tracking link. You can also find it on your Orders page after logging in.",
      category: "Shipping",
    },

    // BILLING & PAYMENTS
    {
      id: "payment-methods",
      question: "Which payment methods do you accept?",
      answer:
        "We accept major credit cards and PayPal. All transactions are processed securely. Currency is shown at checkout.",
      category: "Billing & Payments",
    },
    {
      id: "payment-security",
      question: "Is my payment information secure?",
      answer:
        "Yes. We use secure payment gateways and do not store full card details on our servers.",
      category: "Billing & Payments",
    },

    // ORDERS & RETURNS
    {
      id: "returns-policy",
      question: "What is your return policy?",
      answer:
        "Unused items may be returned within 30 days of delivery for a refund or exchange. Please contact support to obtain an RMA and return instructions.",
      category: "Orders & Returns",
    },
    {
      id: "order-changes",
      question: "Can I change or cancel my order?",
      answer:
        "We can help if your order hasn’t shipped yet. Contact us as soon as possible with your order number.",
      category: "Orders & Returns",
    },

    // SIZES & MATERIALS
    {
      id: "ring-sizing",
      question: "What ring sizes do you offer?",
      answer: (
        <>
          Our rings typically span sizes <strong>{ringSizeRange}</strong> ({ringSizesCount} size
          steps). Product pages list in-stock sizes, and some styles support custom sizing—just
          mention it at checkout or contact us.
        </>
      ),
      category: "Sizes & Materials",
    },
    {
      id: "clothes-sizing",
      question: "Which clothing sizes are available?",
      answer: (
        <>
          We commonly stock: <strong>{clothesSizeLabels}</strong>. Size availability depends on the
          item—check each product page for current options.
        </>
      ),
      category: "Sizes & Materials",
    },
    {
      id: "materials",
      question: "What materials do you use?",
      answer: (
        <>
          Materials vary by collection and item. Common materials include {matsPreview}. See the
          “Materials” section on each product page for specifics.
        </>
      ),
      category: "Sizes & Materials",
    },

    // PRODUCTS & COLLECTIONS
    {
      id: "collections-overview",
      question: "What kinds of products do you offer?",
      answer: (
        <>
          We curate <strong>{collectionsCount}</strong> main collections, including {collectionPreview}.
          Browse “Shop” or “Collections” from the top navigation to explore all categories and
          sub-categories.
        </>
      ),
      category: "Products & Collections",
    },
    {
      id: "custom-requests",
      question: "Do you accept custom or bulk orders?",
      answer:
        "For select items (e.g., rings, gifts, corporate sets), we can often accommodate custom or bulk requests. Reach out with details and we’ll advise on feasibility and lead time.",
      category: "Products & Collections",
    },

    // ACCOUNT
    {
      id: "account-security",
      question: "How can I secure my account?",
      answer:
        "Use a strong, unique password and avoid sharing it. For extra safety, log out on shared devices.",
      category: "Account",
    },
    {
      id: "orders-history",
      question: "Where can I see my orders?",
      answer:
        "Log in and visit your Orders page for order status, tracking links, and invoices.",
      category: "Account",
    },

    // STORE INFO / CONTACT
    {
      id: "contact",
      question: "How can I contact you?",
      answer: (
        <>
          You can reach us at <a href={`mailto:${adminInfo.email}`}>{adminInfo.email}</a> or by
          phone at {adminInfo.phone}. You can also use our{" "}
          <a href="/contact">contact form</a>. Our address: {adminInfo.address}.
        </>
      ),
      category: "Store Info",
    },
    {
      id: "social",
      question: "Do you have social media?",
      answer: (
        <>
          Yes—follow us for new arrivals and offers:
          <ul className="mb-0 mt-2">
            {facebook && (
              <li>
                <a href={facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
            )}
            {instagram && (
              <li>
                <a href={instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
            )}
            {youtube && (
              <li>
                <a href={youtube} target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </li>
            )}
          </ul>
        </>
      ),
      category: "Store Info",
    },
  ];
}

// ---- Component ----
export default function FAQ() {
  // Data state
  const [data, setData] = useState<Faq[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [openIds, setOpenIds] = useState<string[]>([]); // allow multiple open

  // --- Data Fetching (simulated) ---
  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        await new Promise((res) => setTimeout(res, 150)); // small UX delay
        setData(buildFaqData());
        setStatus("success");
      } catch (err) {
        console.error("Failed to build FAQs:", err);
        setStatus("error");
      }
    };
    fetchData();
  }, []);

  // --- Derived State ---
  const categories = useMemo(() => ["All", ...uniq(data.map((f) => f.category))], [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((f) => {
      const text =
        (typeof f.answer === "string" ? f.answer : "") +
        " " +
        f.question +
        " " +
        f.category;
      const matchesCat = category === "All" || f.category === category;
      const matchesQ = !q || text.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, category, data]);

  // --- Hash / Deep-linking ---
  useEffect(() => {
    if (status !== "success") return;

    const openItemFromHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
      if (!hash) return;

      const found = data.find((f) => f.id === hash) ?? data.find((f) => slug(f.question) === hash);
      if (found) {
        setOpenIds((prev) => (prev.includes(found.id) ? prev : [...prev, found.id]));
        const el = document.getElementById(`heading-${found.id}`);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    openItemFromHash();
    window.addEventListener("hashchange", openItemFromHash);
    return () => window.removeEventListener("hashchange", openItemFromHash);
  }, [status, data]);

  // --- Handlers ---
  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      const next = isOpen ? prev.filter((x) => x !== id) : [...prev, id];

      if (typeof window !== "undefined") {
        const currentHash = window.location.hash.replace("#", "");
        if (isOpen) {
          if (currentHash === id) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
          }
        } else {
          window.history.replaceState(null, "", `#${id}`);
        }
      }
      return next;
    });
  };

  const openAll = () => setOpenIds(filtered.map((f) => f.id));
  const closeAll = () => setOpenIds([]);

  return (
    <div className="app-body">
      <div className="container">
        {/* Breadcrumb */}
        <div className="row gx-3">
          <div className="col-12 col-xl-8">
            <ol className="breadcrumb mb-3">
              <li className="breadcrumb-item">
                <i className="icon-house_siding lh-1" />
                <a href="/" className="text-decoration-none ms-1">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">Pages</li>
              <li className="breadcrumb-item active" aria-current="page">
                FAQ
              </li>
            </ol>
          </div>
        </div>

        {/* Card */}
        <div className="row gx-3">
          <div className="col-12">
            <div className="card mb-3">
              <div className="card-body">
                <div className="border rounded-3 p-4 p-md-5">
                  {/* Header / Search */}
                  <div className="d-flex flex-column flex-md-row align-items-md-end mb-4 gap-3">
                    <div className="flex-grow-1">
                      <h3 className="mb-2">How can we help?</h3>
                      <p className="mb-0">
                        Search for a topic or{" "}
                        <a href="/contact" className="text-primary">
                          contact support
                        </a>
                        .
                      </p>
                    </div>

                    <div className="d-flex gap-2 w-100 w-md-auto">
                      <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        aria-label="Filter by category"
                        disabled={status !== "success"}
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search FAQs"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          aria-label="Search FAQs"
                          disabled={status !== "success"}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => setQuery("")}
                          title="Clear"
                          aria-label="Clear search"
                          disabled={!query}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bulk controls */}
                  <div className="d-flex justify-content-end gap-2 mb-3">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={openAll}
                      disabled={filtered.length === 0 || status !== "success"}
                    >
                      Expand all
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={closeAll}
                      disabled={openIds.length === 0 || status !== "success"}
                    >
                      Collapse all
                    </button>
                  </div>

                  {/* Accordion */}
                  <div className="row">
                    <div className="col-12 col-xl-10">
                      {status === "loading" && <div className="text-center p-5">Loading FAQs...</div>}
                      {status === "error" && (
                        <div className="alert alert-danger">Failed to load FAQs. Please try again later.</div>
                      )}
                      {status === "success" && filtered.length === 0 && (
                        <div className="text-muted fst-italic">No results. Try a different term.</div>
                      )}

                      {status === "success" && filtered.length > 0 && (
                        <div className="accordion" id="accordionFaq">
                          {filtered.map((f) => {
                            const headingId = `heading-${f.id}`;
                            const collapseId = `collapse-${f.id}`;
                            const isOpen = openIds.includes(f.id);
                            return (
                              <div className="accordion-item" key={f.id}>
                                <h2 className="accordion-header" id={headingId}>
                                  <button
                                    className={`accordion-button ${!isOpen ? "collapsed" : ""}`}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={collapseId}
                                    onClick={() => toggle(f.id)}
                                  >
                                    <span className="me-2 badge text-bg-light">{f.category}</span>
                                    <span className="fw-semibold">
                                      {typeof f.answer === "string"
                                        ? highlight(f.question, query)
                                        : highlight(f.question, query)}
                                    </span>
                                  </button>
                                </h2>
                                <div
                                  id={collapseId}
                                  className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
                                  aria-labelledby={headingId}
                                >
                                  <div className="accordion-body">
                                    <div>
                                      {typeof f.answer === "string" ? highlight(f.answer, query) : f.answer}
                                    </div>
                                    <div className="mt-3">
                                      <a
                                        href={`#${f.id}`}
                                        className="small text-decoration-none"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          window.history.replaceState(null, "", `#${f.id}`);
                                        }}
                                      >
                                        Share link to this answer
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact block */}
                  <div className="text-center pt-5 border p-3 w-100 w-md-75 w-xl-50 rounded-3 mt-5 m-auto">
                    <h4 className="mb-1">Still can’t find your answer?</h4>
                    <p className="mb-3 text-muted">We’re happy to help!</p>
                    <a href="/contact" className="btn btn-outline-primary">
                      Contact us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
