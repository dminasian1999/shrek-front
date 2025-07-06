import { baseUrlBlog } from "../../utils/constants.ts"
import { ProductT, UserProfile } from "../../utils/types.ts"

export const uploadImage1 = async (file: File, token: string) => {
  const fd = new FormData()
  fd.append("file", file)
  const res = await fetch(`${baseUrlBlog}/post/file/upload`, {
    method: "POST",
    headers: { Authorization: token },
    body: fd
  })
  if (!res.ok) throw new Error("Image upload failed")
  return await res.json()
}

export const uploadImage = async (file: File, token: string): Promise<string> => {
  const fd = new FormData()
  fd.append("file", file)
  const res = await fetch(`${baseUrlBlog}/post/file/upload`, {
    method: "POST",
    headers: { Authorization: token },
    body: fd
  })
  if (!res.ok) throw new Error("Image upload failed")
  const text = await res.text()
  try {
    return JSON.parse(text).url
  } catch {
    return text.trim()
  }
}

export const postProduct = async (product: ProductT, user: UserProfile, token: string) => {
  const res = await fetch(`${baseUrlBlog}/post/${user.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(product)
  })
  if (!res.ok) throw new Error(`Save failed: ${product.name}`)
}
// import {baseUrlBlog} from "../../utils/constants";
//
// export const fetchPosts = async (filters?: any) => {
//     const response = await fetch(`${baseUrlBlog}/posts`, {
//         method: 'Post',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         // Assuming you're sending filters as query parameters
//         body: JSON.stringify(filters),
//     });
//
//     if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
//     return response.json();
// };
//
//
export const getPostById = async (postId: string) => {
  const response = await fetch(`${baseUrlBlog}/post/${postId}`)
  if (!response.ok) throw new Error(`Failed: ${response.statusText}`)
  const res: ProductT = await response.json()
  return res
}



export const getPostByIds = async (ids: string[], token: string) => {
  const response = await fetch(`${baseUrlBlog}/posts/wishList`, { // ✅ removed stray `}`
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",

    },
    body: JSON.stringify(ids)
  });

  if (!response.ok) {
    throw new Error(`Failed: ${response.status} ${response.statusText}`);
  }

  const res = await response.json();
  return res;
};


// export const addPost = async (login: string, token: string, newPost: NewPostT) => {
//     const response = await fetch(`${baseUrlBlog}/post/${login}`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": token,
//         },
//         body: JSON.stringify(newPost),
//     });
//
//     if (!response.ok) {
//         throw new Error(`Failed to add post: ${response.statusText}`);
//     }
//
//     return response.json(); // Parse and return the JSON response
// };
//
//
// export const updatePost = async (login: string, token: string, newPost: PostT) => {
//     const response = await fetch(`${baseUrlBlog}/post/${newPost.id}`, {
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": token,
//         },
//         body: JSON.stringify(newPost),
//     })
//     if (!response.ok) {
//         throw new Error(`Failed to add post: ${response.statusText}`);
//     }
//
//     return response.json();
// };
//
//
export const deletePost = async (id: string, token: string) => {
  const response = await fetch(`${baseUrlBlog}/post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
  if (!response.ok) {
    throw new Error(`Failed to delete post: ${response.statusText}`)
  }

  const res: ProductT = await response.json()
  return res
}
export const searchPosts = async (criteria: string,  sort: string,asc: boolean,) => {
    const response = await fetch(`${baseUrlBlog}  /posts/criteria/${criteria}/sort/${sort}/asc/${asc}`)
    if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
  return  await response.json();
};


//
//
// export const deleteComment = async (comment: CommentT, id: string, token: string) => {
//     const response = await fetch(`${baseUrlBlog}/post/${id}/comment`, {
//         method: 'DELETE',
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": token,
//         },
//         body: JSON.stringify({message: comment.message}),
//
//     })
//     if (!response.ok) {
//         throw new Error(`Failed to delete comment: ${response.statusText}`);
//     }
//
//     const res: PostT = await response.json()
//     return res;
// };
//
