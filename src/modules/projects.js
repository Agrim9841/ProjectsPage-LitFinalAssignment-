export let initialProjects = [
    {
        id: 0,
        name: "ASP Latest Test",
        description: "The latest test that is being done on asp. It is done properly and will take time.",
        pipeline: [
            { name: "ASP Pipeline", stage: "Lead Identification"},
            { name: "Antibody Pipeline", stage: "Lead Validation"},
            { name: "ASP Pipeline", stage: "Lead Identification"},
        ],
        status: "in progress",
        priority: "high",
    },
    {
        id: 1,
        name: "ASP Test 9.0",
        description: "The version 9.0 will add this and that feature that you can read in this document. The version 9.0 will add this and that feature that you can read in this document.",
        pipeline: [
            { name: "ASP Pipeline", stage: "Lead Identification"},
            { name: "Antibody Pipeline", stage: "Lead Validation"},
        ],
        status: "completed",
        statusDescription: "completed",
        priority: "high",
    },
    {
        id: 2,
        name: "Test Project",
        description: "The version  will add this and that feature that you can read in this document. The version 9.0 will add this and that feature that you can read in this document.",
        pipeline: [
            { name: "ASP Pipeline", stage: "Lead Identification"},
        ],
        status: "completed",
        priority: "low",
    },
]

export let emptyProjectItem= {
    name: "",
    description: "",
    pipeline: [{ name: "", stage: "Lead Identification"}],
    status: "in progress",
    type: "internal",
    priority: "low"
}