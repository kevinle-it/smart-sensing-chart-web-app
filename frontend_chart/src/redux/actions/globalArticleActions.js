export const GLOBAL_ARTICLE_FILTER = 'GLOBAL_MODEL_FILTER';

export function changeGlobalArticleFilter(selectedArticle) {
    return {
        type: GLOBAL_ARTICLE_FILTER,
        selectedArticle: selectedArticle,
    };
}
