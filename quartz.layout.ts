import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Spacer(),
    Component.Backlinks(),
    //Component.RecentNotes({ 
    //  title: "Recent Notes Published/Modified:",
    //  limit: 5,
    //  showTags: false,
    //}),
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
  ],
  footer: Component.Footer({
    links: {
      "GitHub": "https://github.com/diyaa59",
      "Linkedin": "https://www.linkedin.com/in/diyaa-alkanakre/",
      "Homepage": "https://diyaagrams.com/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    // Component.ContentMeta(),
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
    Component.Spacer(),
    Component.Explorer({
      title: "Site Directory:", // title of the explorer component
      // filterFn: undefined, // apply no filter function, every file and folder will visible
      mapFn: (node) => {
        // dont change name of root node
        if (node.depth > 0) {
          // set emoji for file/folder
          if (node.file) {
            node.displayName = "📜 " + node.displayName
          } else {
            node.displayName = "📁 " + node.displayName
          }
        }
      },
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.Spacer(),
    Component.ArticleTitle(),
    Component.Spacer(),
    Component.ContentMeta()
  ],
  left: [
    Component.PageTitle(),
    Component.Spacer(),
    Component.Search(),
    Component.Spacer(),
    Component.Darkmode(),
  ],
  right: [
    Component.Graph(),
    Component.Spacer(),
    Component.Explorer({
      title: "Site Directory:", // title of the explorer component
      // filterFn: undefined, // apply no filter function, every file and folder will visible
      mapFn: (node) => {
        // dont change name of root node
        if (node.depth > 0) {
          // set emoji for file/folder
          if (node.file) {
            node.displayName = "📜 " + node.displayName
          } else {
            node.displayName = "📁 " + node.displayName
          }
        }
      },
    }),
  ],
}
