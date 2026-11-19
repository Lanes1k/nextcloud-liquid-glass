# Nextcloud Liquid Glass

An iOS-inspired "liquid glass" look for Nextcloud, delivered as a single CSS file for the [Custom CSS](https://github.com/nextcloud/theming_customcss) app. Frosted translucent panels, a colorful gradient wallpaper, soft specular highlights, rounded corners and gentle shadows — with no server file changes, JavaScript, external fonts or remote images.

**Русская версия:** [README.ru.md](README.ru.md)

> CSS reproduces transparency, blur and highlights. It does not implement the real-time optical refraction of Apple's Liquid Glass.
>
> Scope: authenticated and settings pages. Login and public share pages are left untouched.

## Install

1. Back up any Custom CSS you already have.
2. Install and enable the **Custom CSS** app (`theming_customcss`).
3. Open **Administration settings → Theming → Custom CSS**.
4. Paste the whole contents of [`nextcloud-liquid-glass.css`](nextcloud-liquid-glass.css) — plain CSS, no Markdown fences — and save.
5. Reload with a cache bypass (`Ctrl+Shift+R`, or `Cmd+Shift+R` on macOS).

Custom CSS applies to **every user** of the instance, not just the administrator.

## What it changes

- Blue/violet gradient background with a teal glow.
- Dark glass header, translucent main window and navigation.
- Rounded menus, dialogs, secondary buttons and inputs.
- Highlighted navigation items and file rows.
- Follows Nextcloud's light/dark theme through its own CSS variables, not only the OS preference.
- Denser surfaces on mobile, plus an opaque fallback when `backdrop-filter` is unavailable.
- Honours reduced motion, reduced transparency, high-contrast themes and forced colors.

The theme deliberately leaves row heights, navigation sizes, control placement and overlay stacking order alone. It keeps Nextcloud's primary background variable intact so document editors and error states stay readable on opaque paper.

## Tune it

Every knob lives in the first CSS block:

```css
/* Lighter on the GPU */
--lg-blur: 12px;

/* More transparent glass (worse legibility on busy backgrounds) */
--lg-surface: rgba(var(--color-main-background-rgb, 255, 255, 255), .62);

/* Less rounded window */
--lg-radius: 18px;
```

The mobile media query overrides blur and radius separately.

To keep your own Nextcloud wallpaper, delete the five `background-*` declarations from the first block.

## Compatibility

Selectors were written against **Nextcloud 32** and **Nextcloud Vue 8** sources, with some legacy IDs and modern class variants included as fallbacks. That is not a guarantee for every version or third-party app: some app panels may remain opaque. Verify Files, settings, the profile menu, search, the rename/create dialog and the sharing sidebar on your instance.

`preview.html` is a standalone interactive mockup for judging the material — with light/dark toggle and mobile navigation. It loads the same CSS file but is **not** a working Nextcloud and does not replace testing on your server. Serve it locally with `node preview-server.cjs` (no dependencies) or open it next to the CSS file.

## Uninstall / recover

Remove the CSS in the settings and save, or restore your previous version.

If the UI becomes unusable, an administrator can delete **only the Custom CSS setting** with `occ`. This also deletes anything else stored in that field, so back it up first. Example for a typical Linux install; path, web-server user and the Docker command may differ:

```sh
sudo -u www-data php /var/www/nextcloud/occ config:app:delete theming_customcss customcss
```

Recovery command source: the Custom CSS app README.

## License

[MIT](LICENSE)