const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  output: "standalone",

  async rewrites() {
    return [
      //user profile
      {
        source: "/api/userprofiles",
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/userprofiles`,
      },
      // GET/POST mocks
      {
        source: "/api/workspaces/:workspaceId/mocks",
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/workspaces/:workspaceId/mocks`,
      },
      //mocks
      {
        source: "/api/mock",
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/mock`,
      },
      // Edit/Delete mocks
      {
        source: `/api/workspaces/:workspaceId/mocks/:mockId`,
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/workspaces/:workspaceId/mocks/:mockId`,
      },
      //specific mock
      {
        source: "/api/workspaces/:workspaceId/mocks/:mockId",
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/workspaces/:workspaceId/mocks/:mockId`,
      },
      //work spaces
      {
        source: "/api/workspaces",
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/workspaces`,
      },
      //Delete work spaces
      {
        source: "/api/workspaces/:workspaceId",
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/workspaces/:workspaceId`,
      },
      //probes
      {
        source: "/api/probes",
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/probes`,
      },
      //specific probe
      {
        source: "/api/probes/:probeid",
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/probes/:probeid`,
      },
       //Delete probe
       {
        source: "/api/probes/:probeid",
        destination: `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/probes/:probeid`,
      },
    ];
  },
};
