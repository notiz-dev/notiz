---
title: How to manage multiple Java JDK versions on macOS X
description: How to manage multiple Java JDK versions on macOS X using homebrew.
published: true
publishedAt: 2020-04-16T11:30:00.000Z
updatedAt: 2020-10-23T12:08:00.000Z
tags:
  - Quick Tip
  - Java
keywords:
  - macOS X
  - homebrew
authors:
  - Marc Stammerjohann
---

Here is a quick tip on how to install multiple [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html#javasejdk) versions (8, ..., 11, ..., 14 etc.) on macOS X and how to switch between them for your applications.

## Installing Java JDK via Homebrew

Install multiple Java JDK versions using [Homebrew](https://brew.sh/). To install Homebrew run:


<div shortcode="code" title="BASH">

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

</div>

Now install the Java JDK version **11** or above using `brew cask`:

<div shortcode="code" title="BASH">

```bash
brew cask install java<version>

# latest version
brew cask install java
```

</div>

<div shortcode="note">
JDK versions  **8**, **9**, **10** and **11** are no longer supported.
</div>

[AdoptOpenJDK](https://adoptopenjdk.net/) provides older Java versions. To install the Java JDKs from AdoptOpenJDK:

<div shortcode="code" title="BASH">

```bash
# install from third party repository
brew tap adoptopenjdk/openjdk

brew cask install adoptopenjdk<version>

# Java 8
brew cask install adoptopenjdk8

# Java 9
brew cask install adoptopenjdk9

# Java 10
brew cask install adoptopenjdk10

# Java 11
brew cask install adoptopenjdk11
```

</div>

## Switch Java JDK via alias

Setup your `JAVA_HOME` path in your `.zshrc` or `.bash_profile` for your primary Java version and add an export for each installed Java version.

<div shortcode="code" title=".zshrc/.bash_profile">

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v14)

export JAVA_8_HOME=$(/usr/libexec/java_home -v1.8)
export JAVA_11_HOME=$(/usr/libexec/java_home -v11)
export JAVA_14_HOME=$(/usr/libexec/java_home -v14)
```

</div>

To check the default Java version and installation path:

<div shortcode="code" title="BASH">

```bash
java -version # 14
```

</div>

Add an alias to your `.zshrc` or `.bash_profile` for each installed Java version. The alias exports `JAVA_HOME` with the selected `JAVA_VERSION_HOME`.

<div shortcode="code" title=".zshrc/.bash_profile">

```bash
alias java8='export JAVA_HOME=$JAVA_8_HOME'
alias java11='export JAVA_HOME=$JAVA_11_HOME'
alias java14='export JAVA_HOME=$JAVA_14_HOME'
```

</div>

Now, to switch between the Java versions, enter an alias `java8` in your terminal. Execute `java -version` to verify that you are now using the correct Java version.

<div shortcode="note">
Alias **only** changes the Java version in the used terminal instance
</div>
