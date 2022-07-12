async function fetchAPI(query, { variables } = {}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const result = await res.json()
    return result
  } catch (error) {
    console.error(error)
  }
}

export async function getPreviewPostBySlug(slug) {
  const result = await fetchAPI(
    `
    query Articles {
      articles(filters: { slug: { eq: "${slug}" } }) {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return result?.data?.articles.data[0]
}

export async function getAllPostsWithSlug() {
  const result = await fetchAPI(`
  query Articles {
    articles {
      data {
        attributes {
          slug
        }
      }
    }
  }
  `)
  return result?.data?.articles
}

export async function getAllPostsForHome(preview) {
  const result = await fetchAPI(
    `
    query Articles{
      articles {
      data {
        id
        attributes {
          slug
          title
          description
          content
          publishedAt
          image {
            data {
              attributes {
                name
                url
              }
            }
          }
          author {
            data {
              id
              attributes {
                name
                email
                picture {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
      }
    }
  `,
    {
      variables: {
        where: {
          ...(preview ? {} : { status: 'published' }),
        },
      },
    }
  )
  return result?.data
}

export async function getPostAndMorePosts(slug, preview) {
  const result = await fetchAPI(
    `
    query Articles {
      articles(filters: { slug: { eq: "${slug}" } }) {
        data {
          id
          attributes {
            slug
            title
            description
            content
            publishedAt
            image {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            author {
              data {
                id
                attributes {
                  name
                  email
                  picture {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      morePosts: articles(
        sort: "publishedAt:asc"
        pagination: { pageSize: 4 }
        filters: { slug: { ne: "${slug}" } }
      ) {
        data {
          id
          attributes {
            slug
            title
            description
            content
            publishedAt
            image {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            author {
              data {
                id
                attributes {
                  name
                  email
                  picture {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      preview,
      variables: {
        where: {
          ...(preview ? {} : { status: 'published' }),
        },
      },
    }
  )
  return result.data
}

export async function getSEOHomePage() {
  const result = await fetchAPI(`
  query Homepage {
    homepage {
      data {
        attributes {
          hero {
            title
          }
          seo {
            metaTitle
            metaDescription
            shareImage {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
  
  `)

  return result?.data?.homepage
}
