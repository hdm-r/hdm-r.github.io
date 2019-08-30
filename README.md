# Hugo Page

## Main Layout
All pages use the same default html skeleton from:
```
layouts > _default > baseof.html
```
The `baseof.html` skeleton includes the partials `head.html`, `header.html` and `footer.html` from:
```
layouts > partials
```
* These parts are the same for all pages! 
* The **Navigation** is generated in `header.html`. 

Custom content per page is then added via the `{{ block "main" . }}` part in `_baseof.html` which will include the `list.html` or `single.html` skeletons from `layouts > _default` depending on the page type. 

* The main index/landing/home page is an exception and will use the `layouts > index.html` template.
* **All other pages** (except for News) are **single** pages (because they are single markdown files living directly in `/content/`). They will use the `single.html` skeleton from `layouts > _default`.
* The **News** section is a **list** page because it is a folder with an `_index.md` file and multiple other markdown files.
    * It will use the `list.html` skeleton from `layouts > news` by convention and not the one from `_default` because `layouts > news` is more specific and matches with the content folder name.
    * The `layouts > news > list.html` applies to the `content > news > _index.md` file and the `layouts > news > single.html` template will be applied to all other Markdown files in the `content > news` directory (to all news articles).

> The folders `content > people` and `content > projects` are special and so called **headless** bundles. They are only used to store data and will not appear as separate pages or in the menu (as does the **News** folder).
> * This can be achieved by renaming `_index.md` to `index.md` and by setting `headless: true` in the front matter. 
> * Compare `content > news > _index.md` and `content > people > index.md`

## General Content Organisation

Every single page has a markdown file in `/content/` and gets added to the menu via frontmatter parameter `menu: "main"`. New pages can be added simply by copying and adjusting one of those files. 

* `content > _index.md` (home page)
* `content > about.md`
* `content > teaching.md`
* `content > research.md`
* `content > startups.md`

Now, the *real content* is not added directly to the Markdown files. It lives in so called **shotcode** snippets which are located in:
```
layouts > shortcodes
```
Inside the shortcodes, the *real content* is hardcoded in html or generated dynamically. This way, shortcodes can easily be reused or reordered inside a page or accross pages. There is no further naming convetion from HUGO involved here. When using the shortcodes inside a Markdown file, simply write the full path to the desired shortcode snippet.

## Generated Content Organisation
Besides hardcoded content in html, there are thee ways how pages are generated from data in this project.

1. **Hugo List Views** - News: New articles can be added by adding more `news_x.md` files to the `content > news` folder. They will appear in the news list view automatically (_index.md) and will be rendered based on the the `layouts > news > single.html` template.
2. **Headless Bundle** - People and Projects: New People or Projects can be added by adding more `person_x.md` or `project_x.md` files to the respective folders. However, those folders are headless bundles and will not get an extra page. In order to access this data from a shortcode (from another page) you have to use the Hugo template language. See `layouts > shortcodes > people.html` or `layouts > shortcodes > research > projects.html` for examples. In general you can access data from a headless bundles via `{{ $variable := .Site.GetPage "/path/to/folder" }}`.
3. **Json Data** - Publications and Lectures. This data comes from json files which are located at `data > publications / teaching`. Data can be accessed with `{{ $variable := getJSON "/path/to/file.json" }}`. See `layouts > shortcodes > teaching > lectures` for an easy example.

Note that content could also simply be added directly to the markdown files. However, I decided to place everything in the shortcodes.




