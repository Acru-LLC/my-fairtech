export default [
    {
        name: 'Resolution',
        path: 'resolution/:id',
        component: () => import('@/modules/letter/document/verify-document/verifyResolution'),
        // component: () => import('./document/verify-document/verifyResolution'),
        meta: {
            public: true,
        },
    },
]