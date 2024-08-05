import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Spacer(),
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'diyaa59/diyaagrams.com',
        // from data-repo-id
        repoId: 'R_kgDOMesk5g',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDOMesk5s4Cha9H',
      }
    }),
    Component.Spacer(),
    Component.Explorer(),
    Component.Spacer(),
    Component.RecentNotes({
      title: "Recent Notes Published:",
      limit: 5,
    }),
    Component.Spacer(),
  ],
  footer: Component.Footer({
    links: {
      "GitHub": "https://github.com/diyaa59",
      "Linkedin": "https://www.linkedin.com/in/diyaa-alkanakre/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.TableOfContents(),
  ],
  left: [
    Component.PageTitle(),
    Component.Darkmode(),
    Component.Spacer(),
    Component.Search(),
  ],
  right: [
    Component.Graph(),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta()
  ],
  left: [
    Component.PageTitle(),
    Component.Spacer(),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [
  ],
}
