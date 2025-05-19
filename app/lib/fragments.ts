export const HEADER_QUERY = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  
  query Header($headerMenuHandle: String!) {
    shop {
      name
      brand {
        logo {
          image {
            url
          }
        }
      }
    }
    menu(handle: $headerMenuHandle) {
      id
      items {
        ...ParentMenuItem
      }
    }
  }
`;

export const FOOTER_QUERY = `#graphql
  query Footer($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) {
      id
      items {
        ...ParentMenuItem
      }
    }
  }
  
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
`;
