# ELE201 Microcontrollers
This website is for HVL ELE201 Microcontrollers and Computer Network (ELE201 Mikrokontrollere og datanett) course. The content in this website is only for the microcontrollers part.

## How to modify the website

### Info
This website is created using [Minimal Mistakes Jekyll Theme](https://mmistakes.github.io/minimal-mistakes/). The guide on how to use this theme is well explained in the [Quick-Start Guide](https://mmistakes.github.io/minimal-mistakes/). The purpose of this page is to have a quick reference on some features which are mainly used in this website.

You can manually modify the content on Github through your browser, and the changes will be automatically applied as you push your changes. **However, please use [via Github](#via-githubcom) method only when you do minor changes since it is harder to debug if there is a mistake that causes compilation problems**. Also every push fills the commit history and it becomes harder to track important changes. To prepare a whole lecure content, it is highly recommended to use [local edit](#local-edit). 

### Local edit
In this method, you need to have the repository downloaded to your PC, and you can modify the files as you wish.

#### Setup
1. Please make sure that all Jekyll relevant installations are done as explained [here](https://jekyllrb.com/docs/installation/).
2. Clone this repository `git clone https://github.com/fjnn/hvl-ele201.git`
3. Run `bundle install` via terminal under the downloaded folder (aka inside the project repository).


<a name="local-edit"></a>
#### Start
1. Open the project folder using VS Code.
2. Open a terminal in the directory.
3. Run the local side: `bundle exec jekyll serve`
4. The changes will immediately apply at **http://127.0.0.1:4000/** or **http://localhost:4000/**.
5. When you push the changes to Github, the changes will apply within a minute or two.


<a name="via-github"></a>
### Alternative: Via Github
You don't need any installation for this method.
1. Browse to the page that you want to edit on [GitHub](https://github.com/fjnn/hvl-ele201.git).
1. Click *edit this file* button on the right-top corner.
1. Do the desired changes.
1. Save and push changes.


### Important folders and files
1. **_pages/:** is the folder where the lecture content is stored.
2. **_posts/:** is the folder where the HOME page is stored.
3. **_data/navigation.yaml:** is the file where the left-bar (navigation bar for the website/selected content) is customized.

### How to modify an existing page
The sources of this website are written in markdown syntax. There are **3 steps** in modifying an existing page:

1. Find the respective file under `_pages/lectures`.
1. Do necessary modifications either [locally](#local-edit) or [via github.com](#via-githubcom)
1. Save and push to GitHub. The changes will be automatically applied. You can follow the status at: [GitHub Actions](https://github.com/fjnn/hvl-ele201/actions)

### How to add a new page
There are **5 steps** in adding a page:

1. Find the respective folder under `_pages`.
2. Create the name accordingly such as `lX-TOPICNAME.md` and copy-paste the course content header:
```markdown
---
layout: single
title: "Lecture X - Name"
permalink: /lectures/lx-name
toc: false
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: lectures
taxonomy: markup
---
```
3. Change the **title**, **permalink** and **nav** elements.
  - **Title:** is just the name of the page. It can be chosen freely.
  - **Permalink:** is the link to this page. By using this link in anywhere in any page, you can create a reference to this page. For consistency between notes, please keep the rule `/lectures/lx-name` for lecture notes, `/examples/ex-name` for examples and `/projects/px-name` for projects.
  - **Navigation:** is the category of this page belong to. This tag is important for the left navigation bar and `_data/navigation.yml`
4. Add the title and the permalink under the respective parent folder in `_data/navigation.yml`.

  ```markdown
  - title: "Lecture X"
    url: /lectures/lx-name
  ```
5. Add the title and the permalink in `_pages/lectures/lectures.md`
- [Lecture X - Name](/lectures/lx-name)


### Important files

{: .notice--info} 
This section is for advanced users.

- All the source files are under `_pages/`. 99% of the time, you don't need to browse anywhere else than this.
- If you want to modify things on the **Home** page: `_posts/2023-06-24-home.md`
- The **_config.yml**, **jekyll.yml** and **Gemfile** are responsible in all kind of dependencies and settings. The details can be found [here](https://jekyllrb.com/docs/structure/).


### Useful links

- Markdown [cheat-sheet](https://www.markdownguide.org/cheat-sheet/).
- It is good to have a [Markdown preview extension for VS Code]( https://marketplace.cursorapi.com/items?itemName=yzhang.markdown-all-in-one)
- Minimal mistakes theme [source code](https://github.com/mmistakes/minimal-mistakes)
- [Tags and formatting](https://mmistakes.github.io/minimal-mistakes/markup/markup-html-tags-and-formatting/).




**_NOTE:_**  This website is created using [Minimal Mistakes Jekyll theme](https://mmistakes.github.io/minimal-mistakes/).
Minimal Mistakes incorporates [Lunr](http://lunrjs.com),
Copyright (c) 2018 Oliver Nightingale.
Lunr is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).