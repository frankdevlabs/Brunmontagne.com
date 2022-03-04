exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect } = actions;
  const redirects = await graphql(`
    {
      allGoogleRedirectsSheet(filter: { redirect__Y_N_: { eq: "Y" } }) {
        nodes {
          redirectTo
          legacy
          code
        }
      }
    }
  `);

  const isEnvDevelopment = process.env.NODE_ENV === "development";
  redirects.data.allGoogleRedirectsSheet.nodes.forEach(
    ({ legacy, redirectTo, code }) => {
      createRedirect({
        fromPath: legacy,
        toPath: redirectTo,
        isPermanent: true,
        force: true,
        statusCode: code,
        redirectInBrowser: isEnvDevelopment,
      });
    }
  );
};
