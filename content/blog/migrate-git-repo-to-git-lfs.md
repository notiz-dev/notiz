---
title: 'Migrate Git Repository to Git Large File Storage (LFS)'
description: 'How to migrate an existing Git Repository to use Git Large File Storage (LFS).'
published: true
publishedAt: 2020-03-24T18:13:00.000Z
updatedAt: 2020-04-24T18:13:00.000Z
tags:
  - Git
authors:
  - 'Marc Stammerjohann'
---

If you ever come across this error while pushing an repository to GitHub...

`remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.`

... here is how to setup [Git Large File Storage (LFS)](https://git-lfs.github.com/) and migrate your Git history.

## 1. Download and Install Git LFS extension

Download and install the [Git LFS](https://git-lfs.github.com/) extension, you can also install it using [Homebrew](https://brew.sh/).

```bash
brew install git-lfs
```

## 2. Setup Git LFS for your current user account

```bash
git lfs install
```

## 3. Select files to be managed by Git LFS

```bash
# track files by file type
git lfs track "*.zip"

# track folders by path
git lfs track "src/assets"

# track file by path
git lfs track "assets/design.sketch"
```

`git lfs track` will add these to `.gitattributes`.

## 4. Migrate Git History

git lfs migrate info --everything --include=".zip"
git lfs migrate import --everything --include=".zip" --verbose
