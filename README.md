# Family Circus Hub

# CircEsteem — Modern Parent & Family Web Portal

Act as a **Principal UX/UI Designer, Product Designer, and Senior Frontend Architect**. Design and build a polished, production-quality, responsive web portal for **CircEsteem**, a nonprofit youth circus arts education organization.

The portal is primarily used by **parents/guardians** to manage children, complete required forms, browse and enroll in circus programs, apply for financial aid, manage their shopping cart, and complete payments.

The experience should feel **modern, welcoming, trustworthy, accessible, family-friendly, and premium**, while still feeling appropriate for a nonprofit organization.

Do NOT make this look like a generic SaaS dashboard. It should feel like a modern education/community platform with subtle circus-inspired visual elements.

---

# 1. DESIGN SYSTEM & BRAND

## Brand Colors

Use the following colors consistently:

* Primary Navy: `#0B2545`

* Secondary Navy: `#134074`

* Primary Orange: `#EE6C4D`

* Action Orange: `#F26419`

* Warning Amber: `#F4A261`

* Error / Alert Red: `#E76F51`

* Background: `#F8F9FA`

* Secondary Background: `#EDF2F4`

* White: `#FFFFFF`

* Primary Text: `#17202A`

* Secondary Text: `#5C6770`

* Border: `#D9E0E5`

* Success Green: `#2A9D8F`

Use orange primarily for CTAs and important actions. Use navy for navigation, headings, and structural elements.

## Typography

Use:

* Primary font: **Inter**

* Optional display font: **Outfit**

Typography should have a strong hierarchy:

* Large page headings

* Clear section headings

* Comfortable body text

* Highly readable form labels

* Large, accessible CTA buttons

Avoid excessive use of all-caps text.

---

# 2. OVERALL VISUAL DIRECTION

Create a clean, modern interface with:

* Rounded cards

* Soft shadows

* Generous whitespace

* Subtle borders

* Large accessible buttons

* Clear form states

* Friendly illustrations/icons

* Subtle circus-inspired accents

* Smooth hover/focus transitions

* Responsive layouts

* Accessible contrast

* Clear empty/loading/error states

Use circus imagery sparingly. Consider subtle visual motifs such as:

* Acrobat silhouette

* Stars

* Curved lines

* Small playful geometric shapes

* Circus-inspired iconography

Do NOT make the interface look like a children's carnival website.

The overall impression should be:

**Modern nonprofit + youth education + trustworthy family portal + subtle circus personality.**

---

# 3. APPLICATION STRUCTURE

Create the following primary routes/pages:

### Public / Onboarding

* `/`

* `/onboarding`

* `/login`

* `/forgot-password`

### Parent Portal

* `/dashboard`

* `/programs`

* `/children`

* `/children/:id`

* `/financial-aid`

* `/release-form`

* `/cart`

* `/checkout`

* `/confirmation`

* `/account`

Use reusable components and a consistent design system across all pages.

---

# 4. TOP NAVIGATION

Create a responsive global navigation.

## Desktop

Left:

**CircEsteem logo**

Include a simple acrobat/circus-inspired icon next to the wordmark.

Center/right navigation:

* Our Current Programs

* General Release Form

* Apply for Financial Aid

* Add Children

* My Account

* Shopping Cart

Shopping cart should display a live badge:

`2`

If there are unsigned release forms, display a small red notification dot beside:

**General Release Form**

Example:

`General Release Form •`

The active page should have a clear visual indicator.

## Mobile

Replace the desktop navigation with:

* Compact header

* CircEsteem logo

* Cart icon

* Hamburger menu

Also create a **fixed mobile bottom navigation bar** containing:

* Home

* Programs

* Children

* Cart

* Account

Make sure the bottom navigation does not overlap page content.

---

# 5. GLOBAL COMPLIANCE ALERT

If one or more children do not have a signed General Release Form, display a sticky alert below the navigation.

Example:

⚠️ **Action Required**

One or more children need a General Release Form completed before enrollment.

CTA:

**Complete Form**

The alert should:

* Be visually noticeable but not overwhelming

* Use amber/orange styling

* Remain visible while navigating

* Allow the user to click directly into the release form

* Display the number of affected children

Example:

`2 children require action`

When all forms are completed, remove the alert completely.

---

# 6. PARENT DASHBOARD

Create a welcoming dashboard rather than a traditional analytics dashboard.

## Header

Display:

**Welcome back, Sarah!**

Subtitle:

`Manage your family, explore programs, and keep your children's enrollment information up to date.`

## Quick Action Cards

Create four prominent cards:

### Explore Programs

Browse current circus programs and enroll your children.

CTA:

**View Programs**

### Manage Children

Add or update your children's information.

CTA:

**Manage Children**

### Financial Aid

Apply for financial assistance or view application status.

CTA:

**View Financial Aid**

### General Release Forms

Show completion status.

Example:

`1 of 2 children completed`

CTA:

**Review Forms**

## Upcoming Enrollment / Activity

Create a section showing:

* Child

* Program

* Date

* Enrollment status

* Payment status

Example:

**Alex Johnson**

Fall 2026 Decatur After School Circus

Tuesdays · 4:00–5:30 PM

`Enrolled`

---

# 7. FIRST-TIME PARENT ONBOARDING

Create a polished multi-step onboarding experience.

Use a horizontal progress stepper on desktop and compact progress indicator on mobile.

Steps:

### Step 1 — Parent Information

Fields:

* First Name

* Last Name

* Email

* Phone

* Address

* City

* State

* ZIP Code

Required fields should be clearly marked.

Use inline validation.

---

### Step 2 — Household Information

Required field:

**Household Income Bracket**

Example options:

* Under $25,000

* $25,000–$49,999

* $50,000–$74,999

* $75,000–$99,999

* $100,000–$149,999

* $150,000+

* Prefer not to say

Add helper text explaining that this information supports nonprofit grant and program reporting.

---

### Step 3 — Volunteer Interest

Question:

**Would you like to volunteer with CircEsteem?**

Use a friendly toggle/radio selection:

* Yes, I'd love to volunteer

* Maybe later

* No, thank you

Make this feel optional and welcoming.

---

### Step 4 — Account Creation

Display:

**You're almost ready!**

Explain that an account has been created and login credentials/password setup instructions will be sent to the parent's email.

CTA:

**Continue to My Dashboard**

---

# 8. CHILD MANAGEMENT

Create an **Add Children** page.

Top section:

**Your Children**

Subtitle:

`Keep your children's information up to date for enrollment and safety.`

Primary CTA:

**+ Add Child**

---

## Child Cards

Each child should have a polished profile card.

Example:

### Alex Johnson

`Age 9` · `Grade 4`

General Release:

🟢 **Signed**

Actions:

* View Profile

* Edit

---

Example incomplete state:

### Emma Johnson

`Age 7` · `Grade 2`

General Release:

🔴 **Action Needed**

CTA:

**Complete Release Form**

---

## Add/Edit Child Modal

Fields:

* First Name

* Last Name

* Birthdate

* Grade

* Allergies

* Special Instructions

* Authorized Pickup Contacts

For allergies and special instructions, provide multiline text areas.

Authorized pickup contacts should support multiple entries.

Each contact should include:

* Name

* Relationship

* Phone

* Authorization status

Include:

**+ Add Authorized Pickup Contact**

---

# 9. GENERAL RELEASE FORM

Create a dedicated release form page.

Header:

**General Release Form**

Subtitle:

`A completed release form is required before your child can participate in CircEsteem programs.`

Display children as selectable cards/tabs.

Example:

`Alex — Signed`

`Emma — Action Needed`

For incomplete children, show the form.

Include:

* Parent/Guardian Name

* Child Name

* Required acknowledgements

* Consent checkboxes

* Digital signature field

* Date

Primary CTA:

**Sign & Submit Release**

After submission, display a success confirmation:

**Release Form Completed**

`Emma is now cleared for enrollment.`

---

# 10. PROGRAM CATALOG

Create a visually engaging program discovery page.

Page header:

**Our Current Programs**

Subtitle:

`Find the perfect circus experience for your child.`

---

## Child Selector

At the top:

**Select Child**

Dropdown:

`Alex Johnson · Age 9`

When a child is selected, automatically filter programs based on:

* Age

* Grade

* Program eligibility

Include an option:

`View All Programs`

---

# 11. PROGRAM CARDS

Create premium program cards.

Each card should include:

* Program name

* Short description

* Location

* Schedule

* Start/end date

* Age range

* Grade range

* Available spots

* Tuition

* Financial aid eligibility

* Enrollment status

Example:

### Fall 2026 Decatur After School Circus

**Tuesdays · 4:00–5:30 PM**

`Ages 8–12`

`Decatur`

**$150**

`12 spots remaining`

CTA:

**Enroll Alex**

Use visual badges such as:

`Open`

`Almost Full`

`Waitlist`

`Free`

---

# 12. ENROLLMENT GUARDRAILS

Before allowing enrollment, validate:

1. Child selected

2. Child meets age/grade requirements

3. General Release Form completed

4. Program has available capacity

5. Child is not already enrolled

If the General Release Form is missing, DO NOT allow enrollment.

Show a modal:

### General Release Form Required

`Alex must have a completed General Release Form before enrolling in this program.`

Primary CTA:

**Complete Release Form**

Secondary:

**Cancel**

---

# 13. FINANCIAL AID

Create a dedicated Financial Aid page.

Hero/banner:

**Financial Assistance Is Available**

Explain that CircEsteem provides sliding-scale and financial assistance to help families participate regardless of financial circumstances.

CTA:

**Start Financial Aid Application**

---

## Application Form

Collect:

* Parent information

* Household income

* Household size

* Number of children participating

* Requested assistance

* Supporting explanation

---

## Documentation Upload

Create drag-and-drop upload areas.

Accepted documents:

* Tax return

* Government assistance documentation

* Extenuating circumstances letter

* Other supporting documentation

Show:

* Upload progress

* File name

* File size

* Remove file action

* Upload success/error state

---

# 14. FINANCIAL AID FEE LOGIC

Clearly explain the processing fee.

Display a highlighted notice:

**Financial Aid Processing Fee**

`A $25 processing fee may apply per child for eligible programs.`

Special rule:

**HomeWork CircusWork programs are 100% free and do not include the $25 processing fee.**

The interface must clearly distinguish:

* Tuition

* Financial aid adjustment

* Processing fee

* Final amount due

Do not hide fees until checkout.

---

# 15. SHOPPING CART

Create a multi-child cart.

Page header:

**Your Cart**

Each line item should include:

* Child

* Program

* Schedule

* Tuition

* Financial aid adjustment

* Processing fee

* Final price

* Remove action

Example:

### Alex Johnson

Fall 2026 Decatur After School Circus

Tuition: `$150.00`

Financial Aid: `-$100.00`

Processing Fee: `$25.00`

Total: `$75.00`

---

# 16. HOUSEHOLD CREDITS

Create a dedicated credit section.

Example:

### Household Credit Available

`You have a $15.00 credit from a previous cancellation.`

CTA/toggle:

**Apply $15 Credit**

When enabled, immediately update the order total.

Display the calculation clearly.

---

# 17. REAL-TIME PRICE DRAWER

Create a sticky order summary on desktop.

On mobile, create a bottom drawer that can expand/collapse.

Show:

Subtotal

Financial Aid

Processing Fees

Household Credits

---

**Total Due**

Any change to:

* child

* program

* financial aid

* credit

* quantity

must immediately update the total.

---

# 18. CHECKOUT STEPPER

Create a multi-step checkout experience:

### 1. Cart

Review selected programs.

### 2. Waiver Check

Confirm all enrolled children have completed required releases.

### 3. Payment

Enter payment information.

### 4. Confirmation

Display successful enrollment.

Use a visual progress stepper:

`Cart → Waiver Check → Payment → Confirmation`

Completed steps should have a checkmark.

---

# 19. STRIPE CHECKOUT

Create a Stripe-inspired payment interface.

Payment form:

* Card Number

* Expiry

* CVC

* Name on Card

* Billing ZIP

Display secure payment messaging.

Example:

🔒 **Secure payment**

`Your payment information is securely processed.`

Primary CTA:

**Complete Checkout & Pay $125.00**

The button amount should dynamically update.

Do not expose or store raw card details in application state.

Use Stripe Elements or an equivalent secure payment integration when backend integration is implemented.

For the prototype, create realistic mocked payment behavior if Stripe credentials are unavailable.

---

# 20. CONFIRMATION PAGE

After successful checkout:

Display a celebratory but professional success state.

Example:

🎉

**Enrollment Complete!**

`Alex Johnson is enrolled in Fall 2026 Decatur After School Circus.`

Show:

* Program

* Child

* Schedule

* Location

* Amount paid

* Payment status

Actions:

**View My Enrollments**

**Return to Dashboard**

---

# 21. TOAST NOTIFICATIONS

Implement reusable toast notifications.

Examples:

Success:

`✓ Alex was added successfully.`

`✓ Program added to your cart.`

`✓ General Release Form submitted.`

`✓ Household credit applied.`

Error:

`Unable to add child. Please check the required fields.`

Warning:

`General Release Form is required before enrollment.`

Toasts should animate in/out smoothly and remain accessible.

---

# 22. RESPONSIVE DESIGN

The application must be fully responsive.

## Desktop

Use:

* Max-width content containers

* Two-column layouts where appropriate

* Persistent sidebar/order summaries where useful

* Full navigation

## Tablet

Collapse secondary navigation and adapt cards to 2-column layouts.

## Mobile

Prioritize:

* Single-column layouts

* Large touch targets

* Bottom navigation

* Sticky CTA buttons

* Collapsible order summary

* Full-screen modals

* Mobile-friendly forms

Minimum interactive target size:

**44px**

Do not allow horizontal scrolling.

---

# 23. ACCESSIBILITY

Follow WCAG 2.2 AA principles.

Include:

* Keyboard navigation

* Visible focus states

* Semantic HTML

* Accessible labels

* ARIA where necessary

* Screen-reader-friendly validation

* Sufficient color contrast

* Do not rely on color alone for status

* Accessible modal behavior

* Error messages associated with fields

---

# 24. UX STATES

Every major component should have realistic states.

Implement:

### Loading

Skeleton loaders rather than blank screens.

### Empty

Example:

`You haven't added any children yet.`

CTA:

**Add Your First Child**

### Error

Clear explanation + retry action.

### Success

Confirmation state with appropriate feedback.

### Disabled

Explain why the action is unavailable.

### Validation

Inline validation for required fields.

---

# 25. COMPONENT ARCHITECTURE

Build reusable components rather than duplicated markup.

Create components such as:

* `Navbar`

* `MobileBottomNav`

* `AlertBanner`

* `PageHeader`

* `ProgressStepper`

* `ChildCard`

* `ChildSelector`

* `ProgramCard`

* `ProgramFilters`

* `ReleaseStatusBadge`

* `ReleaseForm`

* `FinancialAidBanner`

* `FileUploader`

* `CartItem`

* `CreditSelector`

* `OrderSummary`

* `CheckoutStepper`

* `PaymentForm`

* `ConfirmationCard`

* `Modal`

* `Toast`

* `EmptyState`

* `LoadingSkeleton`

Use a centralized design system for:

* Colors

* Typography

* Spacing

* Border radius

* Shadows

* Buttons

* Inputs

* Badges

* Cards

---

# 26. DATA MODEL / APPLICATION LOGIC

Structure the frontend so it can later connect cleanly to a real backend/Salesforce implementation.

Suggested entities:

### Parent

* id

* firstName

* lastName

* email

* phone

* address

* householdIncomeBracket

* volunteerInterest

### Child

* id

* parentId

* firstName

* lastName

* birthdate

* grade

* allergies

* specialInstructions

* authorizedPickupContacts

* releaseFormStatus

### Program

* id

* name

* description

* location

* schedule

* startDate

* endDate

* minAge

* maxAge

* minGrade

* maxGrade

* price

* capacity

* availableSpots

* financialAidEligible

* processingFee

* isFreeProgram

### Enrollment

* id

* childId

* programId

* status

* tuition

* financialAidAmount

* processingFee

* total

### Financial Aid Application

* id

* parentId

* householdIncome

* householdSize

* requestedAmount

* status

* documents

### Household Credit

* id

* parentId

* amount

* source

* expirationDate

* applied

---

# 27. PROTOTYPE DATA

Populate the prototype with realistic sample data.

Parent:

**Sarah Johnson**

Children:

**Alex Johnson**

* Age 9

* Grade 4

* Release Form: Signed

**Emma Johnson**

* Age 7

* Grade 2

* Release Form: Action Needed

Programs:

**Fall 2026 Decatur After School Circus**

* Tuesdays

* 4:00–5:30 PM

* Ages 8–12

* $150

* 12 spots available

**HomeWork CircusWork**

* Free

* No processing fee

Include realistic sample cart and financial aid states so the UI can demonstrate the full experience.

---

# 28. INTERACTION REQUIREMENTS

The prototype should feel genuinely interactive.

Implement:

* Child selection

* Program filtering

* Add child

* Edit child

* Release form completion

* Enrollment validation

* Add to cart

* Remove from cart

* Household credit toggle

* Real-time totals

* Financial aid status

* Multi-step checkout

* Form validation

* Toast notifications

* Modal interactions

* Responsive navigation

Do not create static mockup-only screens.

The main user journeys should actually work within the prototype.

---

# 29. IMPORTANT BUSINESS RULES

Implement these rules in the frontend prototype:

### Release Form

A child cannot enroll unless their General Release Form is signed.

### Age / Grade

Only display/enabled programs appropriate for the selected child's eligibility.

### Financial Aid

Financial aid can reduce tuition to `$0.00` depending on the approved amount.

### Processing Fee

Apply a `$25 processing fee per child` where applicable.

### HomeWork CircusWork

HomeWork CircusWork is:

* 100% free

* $0 processing fee

### Household Credits

Credits can reduce the final amount due.

Do not allow credits to reduce the order below `$0.00`.

### Cart

A parent can enroll multiple children in multiple programs in the same checkout.

---

# 30. MICRO-INTERACTIONS

Use subtle animations:

* Card hover elevation

* Button hover

* Modal fade/scale

* Toast slide-in

* Stepper transitions

* Progress animation

* Cart badge update

* Price total animation

* Success checkmark animation

Animations should be subtle and fast.

Respect `prefers-reduced-motion`.

---

# 31. SECURITY / PRODUCTION CONSIDERATIONS

Do not place sensitive payment information in frontend state.

For future backend integration:

* Use Stripe Elements for card data

* Never store raw card numbers

* Treat financial aid documents as private

* Use authenticated API requests

* Enforce business rules server-side

* Never rely solely on frontend validation

For the current prototype, mock APIs/data where necessary while keeping the architecture ready for real API integration.

---

# 32. FINAL QUALITY BAR

The final result should look like a **real production-ready nonprofit family portal**, not a wireframe or generic admin dashboard.

Prioritize:

1. Excellent UX

2. Clear information hierarchy

3. Accessibility

4. Responsive behavior

5. Consistent design system

6. Realistic interaction

7. Strong enrollment guardrails

8. Clear pricing transparency

9. Trust and security

10. Friendly CircEsteem brand personality

The interface should make the primary parent tasks obvious:

**Manage Children → Complete Required Forms → Find Programs → Apply for Aid → Enroll → Pay**

Before considering the implementation complete, verify every major flow works on both desktop and mobile.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d35c2e04-5d4f-4008-ae02-1f203dc7a924).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
