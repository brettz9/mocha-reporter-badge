# mocha-reporter-badge

[![Build status](https://img.shields.io/travis/albanm/mocha-reporter-badge.svg)](https://travis-ci.org/albanm/mocha-reporter-badge)

*A simple mocha reporter that produces a badge inspired by shields.io*

For example the following badge is self served by this project, not by any service provider.

![Mocha tests status](http://albanm.github.io/mocha-reporter-badge/mocha-badge.svg)

## Install

```sh
npm install mocha-reporter-badge
```

## Usage

```sh
mocha --reporter mocha-reporter-badge > badge.svg
```

You can configure it using environment variables, for example:

```sh
export MOCHA_BADGE_SUBJECT=lint
export MOCHA_BADGE_OK_COLOR=green
export MOCHA_BADGE_KO_COLOR=orange
export MOCHA_BADGE_STYLE=flat
```

You can alternatively pass in Mocha's [`--reporter-option` or `--reporter-options`](https://mochajs.org/#-reporter-option-option-o-option-reporter-options-option) flags, though
using a `badge_path` option in place of piping the output (since `--reporter-options`
does not work when piping output).

```sh
mocha --reporter mocha-reporter-badge --reporter-options badge_subject=lint,badge_ok_color=green,badge_ko_color=orange,badge_style=flat,badge_path=badge.svg
```

or

```sh
mocha --reporter mocha-reporter-badge --reporter-option badge_subject=lint --reporter-option badge_ok_color=green --reporter-option badge_ko_color=orange --reporter-option badge_style=flat --reporter-option badge_path=badge.svg
```
