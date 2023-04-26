export default [
  {
    name: "Check",
    path: "/check",
    redirect: "/check",
    component: {
      render(c) {
        return c('router-view')
      }
    },
    meta: {
      public: true,
      bcTo: { name: "Check" },
    },
    children: [
      {
        name: "CheckVisa",
        path: "visa/:applicationId",
        component: () => import("@/modules/check/visa/Index.vue"),
      },
    ]
  }
]
