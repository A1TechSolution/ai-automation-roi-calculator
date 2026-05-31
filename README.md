# Interactive AI & Automation ROI Calculator

An interactive, client-facing financial analyzer designed to demonstrate and calculate the return on investment (ROI) of adopting AI systems and automated workflows. It computes labor overhead, operational hours saved, and break-even payback timelines directly in the browser in real-time.

---

## 🌟 Features

* **Real-time Configurator**: Interactive range inputs for team size, employee wages, manual workload hours, and annual technology budget.
* **Massive Net Savings Counter**: Smoothly animated ticker that rolls up to show the net yearly profit after subtracting software and agency retainers.
* **Interactive Mini Badges**: Live indicators calculating exact annual hours reclaimed and the ROI factor (e.g., `8.2x return`).
* **Visual Cost Comparison Graph**: Horizontal comparison bars (Red vs. Emerald) that automatically scale in width based on the ratio of manual labor costs versus AI automation costs.
* **Dynamic Lead Generation Copy**: A call-to-action description that dynamically recalculates and writes a personalized pitch showing the user their exact annual savings, encouraging them to book a free audit call.

---

## 🛠️ How to Use

1. Open `index.html` in any web browser.
2. Under **Adjust Your Business Inputs**, slide the parameters to match a business:
   * *Team Size*: Number of employees whose work is impacted by manual tasks.
   * *Average Hourly Cost*: Average wage + employer tax/overhead ($35/hr is standard for office tasks).
   * *Manual Hours/Week*: Hours spent on data entry, copy-pasting, routing support, or cold calling.
   * *Projected AI Budget*: The estimated annual agency investment with A1 Tech Solution.
3. Observe the **Projected Net Annual Savings** roll up, notice the comparison graph adjust, and read the dynamic pitch in the CTA banner.

---

## 🧮 Mathematical Formulas & Logic

The calculation engine in `app.js` runs the following equations on every slider movement:

1. **Current Manual Cost per Year ($)**:
   $$\text{Manual Cost} = \text{Employees} \times \text{Average Hourly Wage} \times \text{Manual Hours per Week} \times 52$$
2. **Yearly Hours Reclaimed**:
   $$\text{Hours Reclaimed} = \text{Employees} \times (\text{Manual Hours per Week} \times 0.75) \times 52$$
   *(Assumes a standard 75% automation efficiency rate)*
3. **Yearly Dollars Saved (Gross)**:
   $$\text{Gross Savings} = \text{Hours Reclaimed} \times \text{Average Hourly Wage}$$
4. **Net Yearly Savings ($)**:
   $$\text{Net Savings} = \text{Gross Savings} - \text{Annual AI Budget}$$
5. **ROI Multiplier**:
   $$\text{ROI} = \frac{\text{Gross Savings}}{\text{Annual AI Budget}}$$
6. **Break-Even Payback Period (Months)**:
   $$\text{Break-Even} = \frac{\text{Annual AI Budget}}{\text{Gross Savings}} \times 12$$

---

## 💼 Business Value: The Sales "Retainer Objection" Solver

This calculator is designed to overcome price objections during sales calls:
* **The Retainer Objection**: A client says: *"Your $2,000 a month ($24,000/yr) automation retainer is too expensive."*
* **The Solver**: Open this calculator. Input their details (e.g. 5 employees spending 15 hours a week on manual CRM entry and billing checks at $30/hr).
* **The Close**: Point to the metrics: *"Your current manual overhead is costing you $117,000 a year. Automating saves you $87,750. By paying us $24,000, you are making a net savings of $63,750 and getting a **3.7x return** on investment. If you don't hire us, you are actively losing $5,300 a month."*
