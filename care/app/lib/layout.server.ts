export async function getLayoutData(context: any) {
  try {
    const { storefront } = context;
    
    // Try to get shop data
    const shop = await storefront.query(`
      query layout {
        shop {
          name
          description
        }
      }
    `).then((result: any) => result.shop).catch(() => ({
      name: 'care•atin',
      description: 'Revolutionary hair wellness technology'
    }));

    return {
      shop,
      headerMenu: null,
      footerMenu: null,
    };
  } catch (error) {
    console.error('Layout data error:', error);
    return {
      shop: {
        name: 'care•atin',
        description: 'Revolutionary hair wellness technology'
      },
      headerMenu: null,
      footerMenu: null,
    };
  }
}
