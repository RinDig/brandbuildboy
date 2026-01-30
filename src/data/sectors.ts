import type { Sector } from "@/lib/sectorTypes";

export const fallbackSectors: Sector[] = [
  {
    slug: "defense-military",
    title: "Defense & Military",
    pageIndex: "001",
    pageTag: "DEFENSE AI ORCHESTRATION",
    hero: {
      title: "Defense AI,\nminus the black box.",
      subtitle:
        "We help defense teams ship mission-ready AI pipelines, not demos. Your operators learn the orchestration patterns, keep the IP, and get resilient decision support in contested environments.",
      ctaLabel: "LET'S TALK",
      ctaHref: "#",
      exploreLabel: "EXPLORE",
    },
    consulting: {
      label: "Consulting",
      title: "Your Defense Orchestration Partners",
      description: [
        "Find a partner who ships mission-ready AI pipelines your teams can run, extend, and certify.",
        "We turn ad hoc pilots into governed orchestration with human oversight, evaluation harnesses, and clean handover. Your people keep the skills and the IP.",
      ],
      cards: [
        {
          id: "/001",
          title: "mission-ready orchestration",
          body: "your stack already has sensors, data lakes, and legacy systems. we map critical workflows, then compose data, models, and rules into a single pipeline with clear inputs/outputs and safety boundaries.",
        },
        {
          id: "/002",
          title: "security & compliance built-in",
          body: "we design with rmf, zero trust, and audit trails from day one so approvals move faster and risk stays visible.",
        },
        {
          id: "/003",
          title: "resilient multi-model ops",
          body: "one model is a single point of failure. we add comparison, arbitration, and fallback across models and rules so outputs are explainable, measurable, and robust under drift.",
        },
      ],
    },
    whyUs: {
      label: "Why us",
      title: "Why choose us for Defense?",
      items: [
        {
          id: "01",
          title: "TRUTH OVER HYPE",
          description:
            "clear go/no-go guidance for mission fit; we will say no when automation is unsafe.",
        },
        {
          id: "02",
          title: "WORKING POCS > POWERPOINTS",
          description:
            "we ship something real your operators can extend - measured by decision time, accuracy, or mission impact.",
        },
        {
          id: "03",
          title: "MULTI-MODEL ORCHESTRATION",
          description:
            "validation, comparison, and fallback across models to increase reliability and explainability.",
        },
        {
          id: "04",
          title: "GOVERNANCE BUILT-IN",
          description:
            "role-based access, red-team tests, and policy-grade audit trails.",
        },
        {
          id: "05",
          title: "CAPABILITY TRANSFER",
          description:
            "pair-building, readable code, internal playbooks; your team keeps the patterns and the IP.",
        },
        {
          id: "06",
          title: "FAST DECISION BANDWIDTH",
          description:
            "structured for leaders who can approve $50-250k in 1-2 meetings.",
        },
      ],
    },
    services: {
      label: "Services",
      title: "Our Defense Services",
      intro:
        "We focus on shipping mission-ready pipelines your teams can run and extend. Each service transfers capability (and IP) to you, with governance and adoption patterns baked in.",
      cards: [
        {
          id: "/001",
          title: "executive advisory",
          price: "$5-10K",
          body: "mission fit assessment, program triage, and a 90-day build vs buy vs orchestrate map.",
        },
        {
          id: "/002",
          title: "capability workshops",
          price: "$15-60K",
          body: "ai literacy to mission capability, pipeline design sprint, and governance bootcamps aligned to your environment.",
        },
        {
          id: "/003",
          title: "rapid prototyping",
          price: "$30-120K",
          body: "4-week pocs for intel triage, logistics planning, predictive maintenance, or training copilots.",
        },
        {
          id: "/004",
          title: "multi-model orchestration",
          price: "$XXX",
          body: "arbitration, consensus, and fallback across models with evaluation harnesses and slas.",
        },
        {
          id: "/005",
          title: "ethics & evaluation engine",
          price: "$XXX",
          body: "bias and robustness tests, red-team exercises, and reporting that safety boards can sign off on.",
        },
      ],
    },
    methodology: {
      label: "Our methodology",
      title: "Our No-Nonsense Defense Development Methodology",
      steps: [
        {
          id: "01",
          title: "DISCOVERY",
          description: "stakeholders, constraints, and a truth-first mission scan.",
        },
        {
          id: "02",
          title: "OPPORTUNITY TRIAGE",
          description:
            "score by impact, feasibility, and governance load; pick 1-2 to prove.",
        },
        {
          id: "03",
          title: "BUILD THE POC",
          description:
            "pair-build a mission-ready pipeline with evaluation from day one.",
        },
        {
          id: "04",
          title: "PILOT & ADOPTION",
          description:
            "ship to a small unit; instrument success (time saved, error rate, mission outcome).",
        },
        {
          id: "05",
          title: "ORCHESTRATE",
          description:
            "connect the poc to data sources, tools, and human oversight; add multi-model logic.",
        },
        {
          id: "06",
          title: "HANDOVER & SCALE",
          description:
            "docs, runbooks, training, and a roadmap you can execute without us.",
        },
      ],
    },
    engagement: {
      label: "Choice",
      title: "Choose the Engagement Model That Suits You Best",
      intro:
        "What you get - mission-ready pipeline, orchestration patterns, governance model, team capability, 100% IP retained. What you will not - buzzword decks, lock-in, dependency.",
      cards: [
        {
          id: "/001",
          title: "advisory sprint",
          body: "fixed-scope clarity: mission map, risk register, and first poc spec.",
        },
        {
          id: "/002",
          title: "co-build squad",
          body: "2-4 of your builders + our architect/engineer to ship a poc in 4-6 weeks.",
        },
        {
          id: "/003",
          title: "project-based",
          body: "we lead end-to-end delivery, with governance and adoption baked in - then hand it back.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        {
          question: "how do we select a mission-critical use case?",
          answer:
            "We score candidate workflows by impact, feasibility, and risk, then pick 1-2 to prove value fast.",
        },
        {
          question: "can you work in air-gapped or classified environments?",
          answer:
            "Yes. We design for on-prem and restricted networks and align to your security controls.",
        },
        {
          question: "how do you handle safety, security, and compliance?",
          answer:
            "We build in rmf, audit trails, red-team tests, and human-in-the-loop gates from day one.",
        },
        {
          question: "can our team maintain this without you?",
          answer:
            "Yes. We pair-build, document, and train so you keep the patterns and IP.",
        },
        {
          question: "how do you measure mission impact?",
          answer:
            "We instrument time saved, accuracy, and operational outcomes tied to mission objectives.",
        },
        {
          question: "what if automation increases risk?",
          answer:
            "We use human gates and fallback logic; if risk is too high, we recommend not automating.",
        },
      ],
    },
    cta: {
      label: "LET'S TALK",
      title: "Book a no-obligation defense consultation today.",
      buttonLabel: "LET'S TALK",
      buttonHref: "#",
    },
  },
  {
    slug: "aerospace",
    title: "Aerospace",
    pageIndex: "002",
    pageTag: "AEROSPACE AI ORCHESTRATION",
    hero: {
      title: "Aerospace AI,\nminus the uncertainty.",
      subtitle:
        "We help aerospace teams ship reliable AI pipelines, not demos. Your engineers learn the orchestration patterns, keep the IP, and raise safety and uptime.",
      ctaLabel: "LET'S TALK",
      ctaHref: "#",
      exploreLabel: "EXPLORE",
    },
    consulting: {
      label: "Consulting",
      title: "Your Aerospace Orchestration Partners",
      description: [
        "Find a partner who ships flight-ready AI pipelines your teams can run, extend, and certify.",
        "We turn scattered pilots into production-minded orchestration with evaluation harnesses, human oversight, and clean handover. Your people keep the skills and the IP.",
      ],
      cards: [
        {
          id: "/001",
          title: "fleet-ready orchestration",
          body: "your stack already has maintenance systems, sensor data, and supply chains. we map critical workflows, then stitch data, models, and rules into a single pipeline with clear inputs/outputs and safety boundaries.",
        },
        {
          id: "/002",
          title: "safety & compliance built-in",
          body: "we design with certification and audit trails from day one so safety reviews move faster.",
        },
        {
          id: "/003",
          title: "multi-model reliability",
          body: "comparison, arbitration, and fallback across models so outputs are explainable, measurable, and resilient.",
        },
      ],
    },
    whyUs: {
      label: "Why us",
      title: "Why choose us for Aerospace?",
      items: [
        {
          id: "01",
          title: "TRUTH OVER HYPE",
          description:
            "clear go/no-go guidance for safety and certification; we will say no when ai is not the answer.",
        },
        {
          id: "02",
          title: "WORKING POCS > POWERPOINTS",
          description:
            "we ship something real your engineers can extend - measured by uptime, error reduction, or turn-time.",
        },
        {
          id: "03",
          title: "MULTI-MODEL ORCHESTRATION",
          description:
            "validation, comparison, and fallback across models to increase reliability and explainability.",
        },
        {
          id: "04",
          title: "GOVERNANCE BUILT-IN",
          description:
            "role-based access, evaluation harnesses, and audit trails that satisfy safety teams.",
        },
        {
          id: "05",
          title: "CAPABILITY TRANSFER",
          description:
            "pair-building, readable code, internal playbooks; your team keeps the patterns and the IP.",
        },
        {
          id: "06",
          title: "FAST DECISION BANDWIDTH",
          description:
            "designed for leaders who can approve $30-150k in 1-2 meetings.",
        },
      ],
    },
    services: {
      label: "Services",
      title: "Our Aerospace Services",
      intro:
        "We focus on shipping production-minded pipelines your teams can run and extend. Each service transfers capability (and IP) to you, with governance and adoption patterns baked in.",
      cards: [
        {
          id: "/001",
          title: "executive advisory",
          price: "$5-10K",
          body: "fleet readiness check, opportunity triage, and a 90-day build vs buy vs orchestrate map.",
        },
        {
          id: "/002",
          title: "capability workshops",
          price: "$12-60K",
          body: "ai literacy to capability, pipeline design sprint, and governance bootcamps tailored to your stack.",
        },
        {
          id: "/003",
          title: "rapid prototyping",
          price: "$25-120K",
          body: "4-week pocs for predictive maintenance, parts forecasting, quality inspection, or documentation copilots.",
        },
        {
          id: "/004",
          title: "multi-model orchestration",
          price: "$XXX",
          body: "arbitration, consensus, and fallback across models with evaluation harnesses and slas.",
        },
        {
          id: "/005",
          title: "ethics & evaluation engine",
          price: "$XXX",
          body: "bias and robustness tests, red-team exercises, and reporting safety can sign off on.",
        },
      ],
    },
    methodology: {
      label: "Our methodology",
      title: "Our No-Nonsense Aerospace Development Methodology",
      steps: [
        {
          id: "01",
          title: "DISCOVERY",
          description: "stakeholders, constraints, and a truth-first safety scan.",
        },
        {
          id: "02",
          title: "OPPORTUNITY TRIAGE",
          description:
            "score by impact, feasibility, and certification load; pick 1-2 to prove.",
        },
        {
          id: "03",
          title: "BUILD THE POC",
          description:
            "pair-build a production-minded pipeline with evaluation from day one.",
        },
        {
          id: "04",
          title: "PILOT & ADOPTION",
          description:
            "ship to a small fleet or line; instrument success (downtime, error rate, turn-time).",
        },
        {
          id: "05",
          title: "ORCHESTRATE",
          description:
            "connect the poc to data sources, tools, and human oversight; add multi-model logic.",
        },
        {
          id: "06",
          title: "HANDOVER & SCALE",
          description:
            "docs, runbooks, training, and a roadmap you can execute without us.",
        },
      ],
    },
    engagement: {
      label: "Choice",
      title: "Choose the Engagement Model That Suits You Best",
      intro:
        "What you get - working pipeline, orchestration patterns, governance model, team capability, 100% IP retained. What you will not - buzzword decks, lock-in, dependency.",
      cards: [
        {
          id: "/001",
          title: "advisory sprint",
          body: "fixed-scope clarity: opportunity map, risk register, and first poc spec.",
        },
        {
          id: "/002",
          title: "co-build squad",
          body: "2-4 of your builders + our architect/engineer to ship a poc in 4-6 weeks.",
        },
        {
          id: "/003",
          title: "project-based",
          body: "we lead end-to-end delivery, with governance and adoption baked in - then hand it back.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        {
          question: "how do we pick the first aerospace use case?",
          answer:
            "We score candidate workflows by impact, feasibility, and certification risk, then pick 1-2 to prove fast.",
        },
        {
          question: "how do you support certification and safety audits?",
          answer:
            "We build evaluation harnesses, audit trails, and documentation into the pipeline from day one.",
        },
        {
          question: "can you integrate with mro and supply chain systems?",
          answer:
            "Yes. We design clear inputs and outputs to connect with existing maintenance and planning tools.",
        },
        {
          question: "can our team maintain this without you?",
          answer:
            "Yes. We pair-build, document, and train so your team owns the system.",
        },
        {
          question: "how do you prove roi in uptime or cost?",
          answer:
            "We instrument downtime avoided, turnaround time, and maintenance cost reductions.",
        },
        {
          question: "what if ai outputs are inconsistent?",
          answer:
            "We use multi-model comparison and human gates to catch drift and keep decisions safe.",
        },
      ],
    },
    cta: {
      label: "LET'S TALK",
      title: "Book a no-obligation aerospace consultation today.",
      buttonLabel: "LET'S TALK",
      buttonHref: "#",
    },
  },
  {
    slug: "enterprise",
    title: "Enterprise",
    pageIndex: "003",
    pageTag: "ENTERPRISE AI ORCHESTRATION",
    hero: {
      title: "Enterprise AI,\nminus the theater.",
      subtitle:
        "We help mid-market enterprises ship working AI pipelines, not decks. Your team learns the orchestration patterns, keeps the IP, and gets adoption above the slideware line.",
      ctaLabel: "LET'S TALK",
      ctaHref: "#",
      exploreLabel: "EXPLORE",
    },
    consulting: {
      label: "Consulting",
      title: "Your Enterprise Orchestration Partners",
      description: [
        "Find a partner who ships working AI pipelines your teams can run, extend, and trust.",
        "We turn scattered ChatGPT use into production-minded orchestration with human-in-the-loop, evaluation harnesses, and clean handover. Your people keep the skills and the IP.",
      ],
      cards: [
        {
          id: "/001",
          title: "orchestration over tools",
          body: "your stack already has plenty of software. what's missing is a way to compose it. we map critical workflows, then stitch data, models, and rules into a single pipeline with clear inputs/outputs and service boundaries.",
        },
        {
          id: "/002",
          title: "adoption & governance built-in",
          body: "if it isn't used, it isn't value. we design human gates, audit trails, rbac, and evaluation tests from day one - so legal and ops are comfortable, and teams actually adopt the thing.",
        },
        {
          id: "/003",
          title: "multi-model reliability",
          body: "one model is a single point of failure. we add comparison, arbitration, and fallback across models (and non-ai rules) so outputs are explainable, measurable, and resilient.",
        },
      ],
    },
    whyUs: {
      label: "Why us",
      title: "Why choose us for Enterprise?",
      items: [
        {
          id: "01",
          title: "TRUTH OVER HYPE",
          description:
            "clear use/don't use guidance for your context; we will say no when ai isn't the answer.",
        },
        {
          id: "02",
          title: "WORKING POCS > POWERPOINTS",
          description:
            "we ship something real that your team can extend - measured by time saved or defect reduction, not slide count.",
        },
        {
          id: "03",
          title: "MULTI-MODEL ORCHESTRATION",
          description:
            "validation, comparison, and fallback across models to increase reliability and explainability.",
        },
        {
          id: "04",
          title: "GOVERNANCE BUILT-IN",
          description:
            "role-based access, evaluation harnesses, red-team tests, and policy-grade audit trails.",
        },
        {
          id: "05",
          title: "CAPABILITY TRANSFER",
          description:
            "pair-building, readable code, internal playbooks; your team keeps the patterns and the IP.",
        },
        {
          id: "06",
          title: "FAST DECISION BANDWIDTH",
          description:
            "designed for leaders who can approve $20-100k in 1-2 meetings.",
        },
      ],
    },
    services: {
      label: "Services",
      title: "Our Enterprise Services",
      intro:
        "We focus on shipping production-minded pipelines your teams can run and extend. Each service transfers capability (and IP) to you, with governance and adoption patterns baked in.",
      cards: [
        {
          id: "/001",
          title: "executive advisory",
          price: "$2-5K",
          body: "vendor sanity check, opportunity triage, and a 90-day build vs buy vs orchestrate map.",
        },
        {
          id: "/002",
          title: "capability workshops",
          price: "$10-50K",
          body: "ai literacy to capability, pipeline design sprint, and governance bootcamps tailored to your stack.",
        },
        {
          id: "/003",
          title: "rapid prototyping",
          price: "$20-100K",
          body: "4-week pocs that hit a real workflow: research synthesis, claims triage, kyc, compliance reviews, or internal assistants.",
        },
        {
          id: "/004",
          title: "multi-model orchestration",
          price: "$XXX",
          body: "arbitration, consensus, and fallback across models with evaluation harnesses and slas.",
        },
        {
          id: "/005",
          title: "ethics & evaluation engine",
          price: "$XXX",
          body: "bias and robustness tests, red-teaming, and reporting that legal can sign off on.",
        },
      ],
    },
    methodology: {
      label: "Our methodology",
      title: "Our No-Nonsense Enterprise Development Methodology",
      steps: [
        {
          id: "01",
          title: "DISCOVERY",
          description:
            "stakeholders, constraints, and a truth-first opportunity scan.",
        },
        {
          id: "02",
          title: "OPPORTUNITY TRIAGE",
          description:
            "score by impact, feasibility, governance load; pick 1-2 to prove.",
        },
        {
          id: "03",
          title: "BUILD THE POC",
          description:
            "pair-build a production-minded pipeline with evaluation from day one.",
        },
        {
          id: "04",
          title: "PILOT & ADOPTION",
          description:
            "ship to a small cohort; instrument success (time saved, error rate).",
        },
        {
          id: "05",
          title: "ORCHESTRATE",
          description:
            "connect the poc to data sources, tools, and human oversight; add multi-model logic.",
        },
        {
          id: "06",
          title: "HANDOVER & SCALE",
          description:
            "docs, runbooks, training, and a roadmap you can execute without us.",
        },
      ],
    },
    engagement: {
      label: "Choice",
      title: "Choose the Engagement Model That Suits You Best",
      intro:
        "What you get - working pipeline, orchestration patterns, governance model, team capability, 100% IP retained. What you will not - buzzword decks, lock-in, dependency.",
      cards: [
        {
          id: "/001",
          title: "advisory sprint",
          body: "fixed-scope clarity: opportunity map, risk register, and first poc spec.",
        },
        {
          id: "/002",
          title: "co-build squad",
          body: "2-4 of your builders + our architect/engineer to ship a poc in 4-6 weeks.",
        },
        {
          id: "/003",
          title: "project-based",
          body: "we lead end-to-end delivery, with governance and adoption baked in - then hand it back.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        {
          question: "how do we pick the first enterprise use case?",
          answer:
            "We score candidate workflows by impact, feasibility, and governance load, then pick 1-2 to prove value quickly.",
        },
        {
          question: "what does orchestration mean in practice?",
          answer:
            "It means chaining data, models, tools, and human review into one reliable workflow with clear inputs and outputs.",
        },
        {
          question: "how do you handle security and compliance?",
          answer:
            "We build role-based access, audit trails, evaluation harnesses, and red-team tests into every pipeline.",
        },
        {
          question: "can our team maintain this without you?",
          answer:
            "Yes. We pair-build, document, and train so your team can run and extend what we ship.",
        },
        {
          question: "how do you prove roi?",
          answer:
            "We instrument time saved, defect reduction, and other outcomes tied to real workflows.",
        },
        {
          question: "what if ai is not right for our problem?",
          answer:
            "We will tell you. If automation is not the answer, we will recommend a different path.",
        },
      ],
    },
    cta: {
      label: "LET'S TALK",
      title: "Book a no-obligation enterprise consultation today.",
      buttonLabel: "LET'S TALK",
      buttonHref: "#",
    },
  },
  {
    slug: "government",
    title: "Government",
    pageIndex: "004",
    pageTag: "GOVERNMENT AI ORCHESTRATION",
    hero: {
      title: "Government AI,\nminus the guesswork.",
      subtitle:
        "We help agencies ship citizen-ready AI pipelines, not pilots. Your teams learn the orchestration patterns, keep the IP, and deliver transparent services.",
      ctaLabel: "LET'S TALK",
      ctaHref: "#",
      exploreLabel: "EXPLORE",
    },
    consulting: {
      label: "Consulting",
      title: "Your Government Orchestration Partners",
      description: [
        "Find a partner who ships AI pipelines your teams can run, extend, and govern inside procurement constraints.",
        "We turn scattered pilots into production-minded orchestration with human-in-the-loop, evaluation harnesses, and clean handover. Your people keep the skills and the IP.",
      ],
      cards: [
        {
          id: "/001",
          title: "public-service orchestration",
          body: "your stack already has case systems, forms, and data silos. we map critical workflows, then stitch data, models, and rules into a single pipeline with clear inputs/outputs and service boundaries.",
        },
        {
          id: "/002",
          title: "governance & privacy built-in",
          body: "we design with audit trails, pii handling, and rbac from day one so legal and ops are comfortable.",
        },
        {
          id: "/003",
          title: "multi-model reliability",
          body: "one model is a single point of failure. we add comparison, arbitration, and fallback across models so outputs are explainable, measurable, and resilient.",
        },
      ],
    },
    whyUs: {
      label: "Why us",
      title: "Why choose us for Government?",
      items: [
        {
          id: "01",
          title: "TRUTH OVER HYPE",
          description:
            "clear use/do not use guidance for public impact; we will say no when ai is not the answer.",
        },
        {
          id: "02",
          title: "WORKING POCS > POWERPOINTS",
          description:
            "we ship something real your teams can extend - measured by time saved or service outcomes.",
        },
        {
          id: "03",
          title: "MULTI-MODEL ORCHESTRATION",
          description:
            "validation, comparison, and fallback across models to increase reliability and explainability.",
        },
        {
          id: "04",
          title: "GOVERNANCE BUILT-IN",
          description:
            "role-based access, evaluation harnesses, red-team tests, and policy-grade audit trails.",
        },
        {
          id: "05",
          title: "CAPABILITY TRANSFER",
          description:
            "pair-building, readable code, internal playbooks; your team keeps the patterns and the IP.",
        },
        {
          id: "06",
          title: "FAST DECISION BANDWIDTH",
          description:
            "structured for leaders who can approve $25-125k in 1-2 meetings.",
        },
      ],
    },
    services: {
      label: "Services",
      title: "Our Government Services",
      intro:
        "We focus on shipping production-minded pipelines your teams can run and extend. Each service transfers capability (and IP) to you, with governance and adoption patterns baked in.",
      cards: [
        {
          id: "/001",
          title: "executive advisory",
          price: "$5-10K",
          body: "program sanity check, opportunity triage, and a 90-day build vs buy vs orchestrate map.",
        },
        {
          id: "/002",
          title: "capability workshops",
          price: "$12-60K",
          body: "ai literacy to capability, pipeline design sprint, and governance bootcamps tailored to your stack.",
        },
        {
          id: "/003",
          title: "rapid prototyping",
          price: "$20-100K",
          body: "4-week pocs for case triage, benefits routing, compliance reviews, or internal assistants.",
        },
        {
          id: "/004",
          title: "multi-model orchestration",
          price: "$XXX",
          body: "arbitration, consensus, and fallback across models with evaluation harnesses and slas.",
        },
        {
          id: "/005",
          title: "ethics & evaluation engine",
          price: "$XXX",
          body: "bias and robustness tests, red-team exercises, and reporting that oversight can sign off on.",
        },
      ],
    },
    methodology: {
      label: "Our methodology",
      title: "Our No-Nonsense Government Development Methodology",
      steps: [
        {
          id: "01",
          title: "DISCOVERY",
          description:
            "stakeholders, constraints, and a truth-first public impact scan.",
        },
        {
          id: "02",
          title: "OPPORTUNITY TRIAGE",
          description:
            "score by impact, feasibility, and governance load; pick 1-2 to prove.",
        },
        {
          id: "03",
          title: "BUILD THE POC",
          description:
            "pair-build a production-minded pipeline with evaluation from day one.",
        },
        {
          id: "04",
          title: "PILOT & ADOPTION",
          description:
            "ship to a small cohort; instrument success (time saved, error rate, citizen satisfaction).",
        },
        {
          id: "05",
          title: "ORCHESTRATE",
          description:
            "connect the poc to data sources, tools, and human oversight; add multi-model logic.",
        },
        {
          id: "06",
          title: "HANDOVER & SCALE",
          description:
            "docs, runbooks, training, and a roadmap you can execute without us.",
        },
      ],
    },
    engagement: {
      label: "Choice",
      title: "Choose the Engagement Model That Suits You Best",
      intro:
        "What you get - working pipeline, orchestration patterns, governance model, team capability, 100% IP retained. What you will not - buzzword decks, lock-in, dependency.",
      cards: [
        {
          id: "/001",
          title: "advisory sprint",
          body: "fixed-scope clarity: opportunity map, risk register, and first poc spec.",
        },
        {
          id: "/002",
          title: "co-build squad",
          body: "2-4 of your builders + our architect/engineer to ship a poc in 4-6 weeks.",
        },
        {
          id: "/003",
          title: "project-based",
          body: "we lead end-to-end delivery, with governance and adoption baked in - then hand it back.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        {
          question: "how do you work with procurement and compliance?",
          answer:
            "We align with your procurement steps and build audit-ready documentation from day one.",
        },
        {
          question: "can you deploy within existing infrastructure?",
          answer:
            "Yes. We design for your current stack and keep data boundaries intact.",
        },
        {
          question: "how do you handle privacy and pii?",
          answer:
            "We implement rbac, data minimization, and audit trails to protect sensitive data.",
        },
        {
          question: "can our team maintain this without you?",
          answer:
            "Yes. We pair-build, document, and train so you own the capability.",
        },
        {
          question: "how do you prove roi in public services?",
          answer:
            "We instrument time saved, throughput, and service quality metrics tied to outcomes.",
        },
        {
          question: "what if ai is not right for the program?",
          answer:
            "We will tell you and recommend a simpler or safer alternative.",
        },
      ],
    },
    cta: {
      label: "LET'S TALK",
      title: "Book a no-obligation government consultation today.",
      buttonLabel: "LET'S TALK",
      buttonHref: "#",
    },
  },
];
