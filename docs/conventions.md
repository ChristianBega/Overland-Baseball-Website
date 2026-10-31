# Conventions

Checkable rules for `client/src`; paths below are relative to it. Reviewers cite
`docs/conventions.md#<heading>`. Each rule names a file to copy. Layout, naming and env rules are in
`CLAUDE.md`. Component and hook APIs live in their source (PropTypes, JSDoc).

### Page shape

Copy `features/home/pages/HomePage.jsx` or `features/events/pages/EventPage.jsx`. Order:
`<Navigation />` (or a Hero that renders it, as `features/home/components/Hero.jsx` does) → full-width
Hero outside the Container → `<Container component="main" id aria-label>` →
`<Grid container columnSpacing={isLg ? 6 : 4}>`. Each feature component wraps itself in
`<Grid item xs={12}>`. `App.jsx` renders only `FooterNavigation`.

### Sections

Wrap each major section in `SectionLayout` (`features/ui/components/SectionLayout.jsx`) with `id` and
`aria-label`. Use `StyledSectionLayoutWrapper` (`features/ui/components/SectionLayout.styles.jsx`) for
the gray variant. `ariaLabel` is legacy, so don't add new uses.

### Text layout

Section titles use `SectionHeader`. Change the heading level with
`titleProps={{ component, variant }}` (see `features/roster/components/TeamRoster.jsx`). Group text
(title + body) with `TextBlock`, not a new flex-column `Box`.

### Responsive

Use `useMediaQueries` (`utils/helpers/useMediaQueries.utils.jsx`). Never import `useMediaQuery` in a
feature file. Add custom breakpoints to `utils/theme/index.theme.jsx` and expose them through the hook.

### Forms

Copy `features/events/components/EventSignUpForm.jsx`. Field config lives in
`features/<f>/data/*.config.json`, and its rules go through `processFormRules`
(`utils/helpers/processFormRules.jsx`). Call `useForm({ mode: "onBlur", reValidateMode: "onChange" })`.
Each field is a `Controller` rendering MUI `TextField` directly: `{...field}`, `variant="outlined"`,
and `error`/`helperText` from `fieldState.error`. Textareas use `multiline`, never
`type="textarea"`. Phone fields use `type="tel"`. No new input wrapper components.

### Form submission

Email forms use `useFormSubmission` (`hooks/useFormSubmission.jsx`) with
`successDisplayDuration: 4000` and `reset()` in the onSuccess callback. Firebase auth forms call
`features/auth/utils/authUtils.jsx` and `useLocalRateLimiting` directly (copy
`features/auth/components/SignInForm.jsx`). Show status with `FormStatusIndicator` and field errors
inline. Disable the submit button with `!canSubmitForm || isLoading` (`!canSubmit` in auth forms).

### Data loading

Fetch Strapi data with `useStrapiCollection` (`hooks/useStrapiCollection.jsx`, backed by
`services/strapiServices.js`). Render loading, error and empty states through `DataStateDisplay`
(copy `features/home/components/Schedule.jsx`). No new `useQuery` call sites, and no direct
`fetch`/axios in components.

### Styling

Added lines use theme tokens (`theme.palette.*`), never hex or named colors. Shared table styling
lives only in `features/ui/components/DataTable.jsx`; domain table styling stays in the feature
folder. A `styled()` component that takes a custom prop declares `shouldForwardProp` (copy
`features/ui/components/Pagination.jsx`).

### Deprecated code

Never import a file whose name starts with `[Deprecated]` (any case) from a non-deprecated file. Don't
add new callers of `useRealtimeData` or `useRoleCheck`; Firebase roles are being phased out.

### API lookup

There is no component catalog. Before you use a component or hook, read its source (PropTypes, JSDoc)
and its nearest existing caller.

### Known exceptions, don't copy

- `features/home/components/ContactUs.jsx` passes `type="textarea"` to `TextField`.
- `features/boosters/pages/BoostersPage.jsx` calls `useMediaQuery` directly.
- `features/roster/components/Staff.jsx` uses `ariaLabel`.
- `features/documents/components/DocumentCard.jsx` uses the `InputFields` wrapper.
- `StyledTableRow` in `features/ui/components/DataTable.jsx` forwards `isEven` without
  `shouldForwardProp`.
- Hex colors in existing files (`Pagination.jsx`, `shared.styles.js`, `DataTable.jsx`, the events
  calendar) are legacy.
- The Boosters, Sponsors, Documents, PasswordReset, 404 and ThemeShowcase pages don't follow
  Page shape.
