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
      "Homepage": "https://diyaagrams.com/",
      "RSS": "https://diyaagrams.com/index.xml",
      "GitHub": "https://github.com/diyaa59",
      "Quartz Documentation": "https://quartz.jzhao.xyz/",
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
    Component.Graph({
      localGraph: {
        drag: true, // whether to allow panning the view around
        zoom: true, // whether to allow zooming in and out
        depth: 2, // how many hops of notes to display
        scale: 1.0, // default view scale
        repelForce: 0.1, // how much nodes should repel each other
        centerForce: 0.2, // how much force to use when trying to center the nodes
        linkDistance: 30, // how long should the links be by default?
        fontSize: 0.6, // what size should the node labels be?
        opacityScale: 1, // how quickly do we fade out the labels when zooming out?
        removeTags: ["Folder-index"], // what tags to remove from the graph
        showTags: true, // whether to show tags in the graph
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 1.0,
        repelForce: 0.1,
        centerForce: 0.2,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
        removeTags: ["Folder-index"], // what tags to remove from the graph
        showTags: true, // whether to show tags in the graph
      },
    }),
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
