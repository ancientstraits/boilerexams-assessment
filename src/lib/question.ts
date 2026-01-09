export type Season = "SPRING" | "SUMMER" | "FALL" | "WINTER"

export type AnswerChoice = {
    id: string,
    index: number,
    body: string,
    questionId: string,
    stats: BasicStats,
    resources: Resource[]
}
export type Flags = {
    published?: boolean,
    disableRandomAnswers?: boolean,
    answersStartHidden?: boolean,
    practice?: boolean,
}
export type BasicStats = {
    count: number,
}
export type Stats = {
    count: number,
    timeSpent: string,
    timeSpentVideo: string,
    submissions: number,
    sumbissionsCorrect: number,
    accuracy: number,
    difficulty: number,
}
export type Exam = {
    id: string,
    number: number,
    year: number,
    season: Season,
    disclaimer: string,
    courseId: string,
    flags: Flags,
    stats: Stats,
}
export type Resource = {
    id: string,
    type: string,
    data: {
        url: string,
    },
    courseId: string | null,
    examId: string | null,
    questionId: string | null,
    explanationId: string,
    applicationId: string | null,
    answerChoiceId: string | null,
    customExamId: string | null,
}
export type Explanation = {
    id: string,
    body: string,
    questionId: string,
    resources: Resource[],
}
export type Topic = {
    id: string,
    name: string,
    courseId: string,
    stats: Stats,
}

export type Question = {
    id: string,
    type: "MULTIPLE_CHOICE",
    data: {
        body: string,
        solution: number[],
        answerChoices: AnswerChoice[],
    },
    number: number,
    disclaimer: string,
    examId: string,
    courseId: string,
    parentId: string | null,
    flags: Flags,
    stats: Stats,
    resources: Resource[],
    exam: Exam,
    explanation: Explanation,
    topics: Topic[],
    children: any[],
}
