import type { AuditScenario } from "@/types/madan"

export const PRESET_SCENARIOS: AuditScenario[] = [
  {
    title: "AI Hiring System Audit",
    systemType: "labor",
    description:
      "A large-scale automated hiring platform used by Fortune 500 companies that scores job applicants across behavioral signals extracted from video interviews, résumé parsing, and social media footprint analysis. Scores range from 0–100 and determine whether a candidate advances to human review.",
    targetPopulation:
      "Working-age job seekers, disproportionately affecting those from non-dominant linguistic backgrounds, career-changers, people with disabilities, and individuals with non-linear employment histories.",
    evaluationMechanism:
      "Multimodal machine learning scoring of facial microexpressions, speech cadence, vocabulary complexity, and keyword alignment between résumé and job description. Trained on historical hiring decisions from companies with documented demographic imbalances.",
    dataSources:
      "Video interview recordings, résumé text, LinkedIn profile data, public social media posts, and proprietary 'trait libraries' derived from behavioral psychology literature from the 1980s–2000s.",
    decisionConsequences:
      "Scores below 60 result in automatic rejection with no human review. Scores between 60–74 enter a secondary queue reviewed only on high-demand days. Only scores above 75 guarantee a human hiring manager conversation.",
    appealMechanism:
      "No appeal mechanism exists. Candidates are not informed of their score or the criteria used to reach a decision.",
    reentryMechanism:
      "Candidates may reapply after 6 months but are flagged in the system as 'previously scored.' No explanation is provided for rejection.",
    contextRecovery:
      "No mechanism exists for candidates to present contextual circumstances such as disability, caregiving responsibilities, or non-linear career history.",
    responsibilityAllocation:
      "Responsibility is distributed between the platform vendor and the hiring company, but neither accepts accountability for individual rejections. Affected candidates have no identified party to contest a decision with.",
    bodilyBurden:
      "Video interview performance is affected by fatigue, disability, anxiety, and neurodivergence. The system does not account for these conditions. Candidates may invest significant preparation time with no feedback on outcome.",
    knownRisks:
      "Documented racial and gender bias in microexpression analysis. ADHD, autism spectrum, and non-native speakers systematically score lower on 'communication coherence' metrics. The system has never been externally audited.",
    desiredFutureDirection:
      "Replace with structured human interview panels supported by anonymized skills assessments. Require explainability for all rejections. Mandate third-party bias audits annually.",
  },
  {
    title: "Educational Ranking System Audit",
    systemType: "education",
    description:
      "A national education ministry has deployed an AI ranking system that assigns students aged 14–18 a composite 'academic potential score' used to stream students into vocational, standard, or advanced academic tracks. The algorithm incorporates teacher behavioral ratings alongside standardized test results.",
    targetPopulation:
      "Secondary school students nationwide, with evidence of disparate impact on students from rural areas, low-income households, students with chronic illness, and students from ethnic minority backgrounds.",
    evaluationMechanism:
      "Weighted average of standardized test scores (40%), teacher behavioral assessments submitted quarterly (35%), and attendance/punctuality records (25%). Track assignments made at age 14 are legally binding until age 18.",
    dataSources:
      "National standardized test databases, teacher-submitted behavioral assessments via a proprietary platform, attendance systems integrated with municipal public transport data.",
    decisionConsequences:
      "Track assignment at 14 determines eligibility for university entrance examinations, type of secondary school funding received, and access to advanced STEM or humanities programs. Vocational track students cannot switch to academic track without repeating two full school years.",
    appealMechanism:
      "A formal appeal requires a parent or guardian to petition the school board in writing. Fewer than 3% of appeals succeed. No mechanism exists to contest teacher behavioral ratings.",
    reentryMechanism:
      "Re-scoring is permitted only once per academic career. No structured re-entry pathway exists for students who wish to change tracks.",
    contextRecovery:
      "No mechanism for students to present contextual circumstances such as chronic illness, family disruption, or learning difference. Teacher behavioral ratings are accepted as-is.",
    responsibilityAllocation:
      "Track assignments are attributed to algorithmic output. The ministry, school administrators, and algorithm vendor share no formally defined accountability for individual misclassification.",
    bodilyBurden:
      "Students with chronic illness, anxiety, ADHD, or autism spectrum conditions are structurally disadvantaged in behavioral rating systems. The system imposes ongoing performance monitoring that generates documented psychological stress.",
    knownRisks:
      "Teacher behavioral ratings contain well-documented bias against students diagnosed with ADHD, anxiety disorders, or those from ethnic minority backgrounds. Rural students score lower on standardized tests due to unequal resource distribution, not academic potential.",
    desiredFutureDirection:
      "Abolish binding track assignment before age 16. Replace teacher behavioral ratings with portfolio-based assessment. Require annual algorithmic bias reporting disaggregated by demographic group.",
  },
  {
    title: "Welfare Eligibility Scoring Audit",
    systemType: "welfare",
    description:
      "A municipal social services department uses a predictive risk-scoring system to triage welfare benefit applications. The system assigns a 'vulnerability priority score' that determines processing speed, benefit generosity, and the assignment of caseworkers.",
    targetPopulation:
      "Adults and families applying for housing assistance, food support, disability benefits, and emergency income support. The system processes approximately 40,000 applications per year.",
    evaluationMechanism:
      "Logistic regression model trained on five years of historical caseload data. Inputs include declared income, household composition, prior benefit history, postcode deprivation index, and 'engagement history' tracking interactions with caseworkers.",
    dataSources:
      "Municipal tax and benefits databases, housing authority records, criminal justice interface data (shared under a data-sharing agreement), prior welfare claim records going back 15 years.",
    decisionConsequences:
      "High-risk scores (>70) receive priority processing within 3 days. Medium scores (40–70) wait 3–6 weeks. Low scores (<40) enter a standard 8-week queue with reduced caseworker attention. Housing applications below 40 are deprioritized regardless of declared urgency.",
    appealMechanism:
      "No formal appeal process. Applicants may request manual review after 30 days, but manual review capacity is severely limited against the existing backlog.",
    reentryMechanism:
      "Applicants may reapply at any time, but the model penalizes repeated applications by treating prior claims as risk indicators. No structured re-entry pathway exists.",
    contextRecovery:
      "No mechanism for applicants to present circumstances explaining previous benefit history, criminal justice contact, or postcode-related disadvantage.",
    responsibilityAllocation:
      "Responsibility for processing decisions is attributed to the algorithm. No named institutional actor is accountable for individual triage outcomes.",
    bodilyBurden:
      "Applicants in crisis — experiencing homelessness, domestic violence, severe illness, or disability — must navigate an 8-week standard queue with reduced caseworker attention. The system does not account for urgency beyond its scoring criteria.",
    knownRisks:
      "Criminal justice data contamination causes systematic underscoring for individuals with past charges but no convictions. Postcode data encodes historical redlining and ethnic segregation. The model reproduces poverty traps by penalizing repeated applications.",
    desiredFutureDirection:
      "Replace predictive scoring with needs-based triage. Provide applicants with written explanations of processing tier. Prohibit use of criminal justice data in benefit eligibility decisions.",
  },
  {
    title: "Research Evaluation System Audit",
    systemType: "academic",
    description:
      "A major academic funding body has deployed an AI system to pre-screen grant applications and research proposals. The system assigns a 'research impact score' used to shortlist applications before human review panels, reducing the panel's workload by approximately 60%.",
    targetPopulation:
      "Academic researchers at all career stages, particularly early-career researchers without extensive publication records, researchers from non-Anglophone institutions, and those working in emerging or interdisciplinary fields.",
    evaluationMechanism:
      "Natural language processing analysis of proposal abstracts and full texts scored against a corpus of highly-cited funded research from the past 15 years. Citation network centrality of named investigators is weighted at 30% of the final score.",
    dataSources:
      "Published paper databases (Scopus, Web of Science), prior grant award records, institutional h-index rankings, and a proprietary 'innovation vocabulary' index derived from tech industry patent language.",
    decisionConsequences:
      "Proposals scoring below 55 are removed from human review entirely. Proposals above 55 are reviewed by panels; above 75 receive priority panel time and are fast-tracked to full review. Applications removed by the AI receive no explanation.",
    appealMechanism:
      "No appeal mechanism. Researchers receive no explanation when removed by the AI. No pathway exists to contest an AI rejection before the next funding cycle.",
    reentryMechanism:
      "Researchers may resubmit in the next funding cycle, typically 12–18 months later. Early-career researchers who miss a cycle may lose institutional affiliation or salary continuity.",
    contextRecovery:
      "No mechanism for researchers to explain why their work does not match the AI's training corpus — particularly researchers in emerging, interdisciplinary, or non-Anglophone fields.",
    responsibilityAllocation:
      "The funding body attributes eligibility decisions to the AI system. No named reviewer is responsible for the AI's rejection of any individual application.",
    bodilyBurden:
      "Grant application processes impose significant unpaid labor, often over months. Rejection without explanation compounds the burden on early-career researchers with precarious employment contracts.",
    knownRisks:
      "Citation network weighting systematically advantages researchers from highly-funded English-language institutions. The 'innovation vocabulary' index is biased toward technology and biomedical fields. Qualitative and humanistic research is structurally underscored.",
    desiredFutureDirection:
      "Restrict AI to administrative completeness checks only. Require diverse interdisciplinary human panels for all scoring. Mandate annual reporting on demographic distribution of funded vs. rejected applicants.",
  },
  {
    title: "Urban Surveillance Classification Audit",
    systemType: "civic",
    description:
      "A metropolitan government has implemented a civic behavior scoring system that assigns residents a 'community contribution index' based on behavioral monitoring in public spaces, digital civic engagement records, and compliance with municipal regulations. The score affects access to public services and housing priority.",
    targetPopulation:
      "All registered residents of the metropolitan area (population 4.2 million), with documented disparate impact on informal workers, migrants, homeless individuals, and residents of historically under-resourced neighborhoods.",
    evaluationMechanism:
      "Sensor-integrated urban surveillance network combining facial recognition in transit systems, commercial zones, and public parks with digital records of civic participation (voting, public comment submissions, voluntary service). Compliance deductions for minor infractions tracked via smart city infrastructure.",
    dataSources:
      "CCTV and facial recognition databases, transit card usage, municipal court records, voluntary civic participation registries, smart meter usage data, and social media monitoring for 'anti-social sentiment.'",
    decisionConsequences:
      "Scores above 750 grant priority access to public housing applications, business licenses, and school enrollment. Scores below 600 result in restricted access to subsidized transit, reduced priority in emergency services queue, and flagging for 'enhanced monitoring.'",
    appealMechanism:
      "No formal appeals process exists. Individuals may petition for score review but cannot access their detailed score breakdown.",
    reentryMechanism:
      "Score recovery requires demonstrable 'positive behavioral events' over 12 consecutive months. The recovery pathway itself requires stable employment, housing, and civic participation — conditions unavailable to the most affected residents.",
    contextRecovery:
      "No mechanism for individuals to explain circumstances that reduced their score: illness, family emergency, informal employment, or cultural difference in civic participation.",
    responsibilityAllocation:
      "The metropolitan government operates the system but attributes scoring outcomes to the algorithm. No individual official is accountable for a resident's score reduction or service restriction.",
    bodilyBurden:
      "Pervasive monitoring creates documented self-modification pressure. Residents alter movement, speech, association, and behavior to avoid score deductions. The burden of behavioral compliance falls on those with the least institutional protection.",
    knownRisks:
      "Facial recognition systems have documented error rates 10–34x higher for darker-skinned individuals. Civic participation metrics favor formal employment and stable housing. Informal workers and migrants are structurally unable to accumulate score through standard channels.",
    desiredFutureDirection:
      "Abolish behavioral scoring for public service access. Restrict facial recognition to targeted law enforcement with judicial oversight. Implement participatory governance structures for all civic infrastructure decisions.",
  },
  {
    title: "Anti-Eugenic Genetic Risk Classification Audit",
    systemType: "insurance",
    description:
      "A health and life insurance consortium uses polygenic risk scores combined with wearable behavioral monitoring to adjust premiums and coverage eligibility. This audit examines whether biological and genetic risk classification is being transformed into exclusion, hierarchy, and insurance discrimination rather than support, care, and anti-eugenic institutional responsibility.",
    targetPopulation:
      "Insurance applicants and existing policyholders who consent to genomic testing and continuous wearable monitoring as a condition of receiving 'standard' rather than 'enhanced-rate' coverage.",
    evaluationMechanism:
      "Polygenic risk scores calculated from genome-wide association study (GWAS) data covering 47 disease categories combined with behavioral risk indices from wearable device data (sleep, activity, heart rate variability). Composite score adjusts premiums quarterly.",
    dataSources:
      "Saliva-based DNA samples, wearable device streams (Fitbit, Apple Watch, proprietary device), prescription medication records (via pharmacy data agreements), and BMI/clinical biomarker records from insurer-contracted clinics.",
    decisionConsequences:
      "Premium adjustments range from -20% to +85% based on composite score. Scores in the highest risk decile trigger automatic referral for 'risk counseling' as a coverage condition. Genetic predispositions for depression and schizophrenia directly affect premiums in the current model.",
    appealMechanism:
      "Policyholders may contest premium adjustments with counter-evidence from an independent physician, at their own expense. Genomic components cannot be altered. No third-party arbitration exists.",
    reentryMechanism:
      "No re-entry pathway from high-risk classification. Genomic data is treated as permanent. Behavioral monitoring requires ongoing compliance with no defined threshold for score improvement.",
    contextRecovery:
      "No mechanism for policyholders to present contextual circumstances — environmental exposures, social determinants of health, or errors in genetic interpretation — that would modify their classification.",
    responsibilityAllocation:
      "Actuarial risk is attributed to the individual genome. No institutional actor accepts responsibility for the social consequences of using genetic data to restrict insurance access.",
    bodilyBurden:
      "Continuous wearable monitoring imposes behavioral self-modification pressure on policyholders. Psychiatric genetic risk classification converts mental health predisposition into financial penalty, discouraging disclosure and treatment-seeking.",
    knownRisks:
      "GWAS training data is 78% European-ancestry, producing higher false-positive risk signals for non-European ancestry individuals. Psychiatric genetic risk factors are used for financial penalty. Behavioral monitoring creates pervasive self-modification pressure and chilling effects on care-seeking.",
    desiredFutureDirection:
      "Prohibit use of genetic data in insurance pricing. Mandate community-rated premiums by law. Establish an independent genomic ethics board with binding enforcement authority. Require anti-eugenic safeguards in all biological risk classification systems.",
  },
  {
    title: "Credit Access Evaluation Audit",
    systemType: "finance",
    description:
      "A consumer credit bureau uses an automated scoring model to produce credit ratings that determine loan eligibility, interest rates, housing rental approval, and in some jurisdictions employment screening. The model is trained on historical repayment behavior, debt levels, credit utilization, and inquiry frequency.",
    targetPopulation:
      "All adults applying for credit, housing, or employment where credit checks are used. Disproportionate impact on young adults without credit history, individuals recovering from medical debt, residents of high-poverty postcodes, and recent immigrants.",
    evaluationMechanism:
      "Proprietary weighted scoring model with 5 major factor categories. Score ranges from 300–850. Model weights are not publicly disclosed. Training data spans 20+ years of historical credit behavior from existing customers.",
    dataSources:
      "Repayment history from lenders, current debt balances, credit utilization ratios, length of credit history, number of recent hard inquiries, and types of credit accounts. Public records including bankruptcy and tax liens.",
    decisionConsequences:
      "Scores below 580 result in rejection for most standard credit products or interest rates 3–8x higher than those offered to high-score applicants. Low scores affect housing rental eligibility and, in some jurisdictions, employment screening. No expiry date for most negative entries.",
    appealMechanism:
      "Consumers may dispute specific items on a credit report. Bureaus are required by law to investigate disputes within 30 days. However, the scoring model itself is proprietary and not subject to dispute. Outcomes of model-level errors cannot be contested.",
    reentryMechanism:
      "Negative entries remain for 7 years; bankruptcies for 10 years. No structured re-entry pathway exists. Score improvement requires sustained positive behavior over multiple years without any mechanism for contextual explanation.",
    contextRecovery:
      "No mechanism for individuals to explain circumstances behind negative entries — medical debt, job loss, domestic violence, predatory lending. The model treats all negative entries equivalently regardless of cause.",
    responsibilityAllocation:
      "Credit bureaus are regulated but not liable for scoring outcomes. Lenders attribute decisions to the model. No institutional actor accepts responsibility for systemic exclusion resulting from model design.",
    bodilyBurden:
      "Low credit scores create compounding material constraints: higher-cost housing, higher interest rates, restricted employment. The system converts historical financial difficulty — often caused by structural conditions — into ongoing exclusion.",
    knownRisks:
      "Models trained on historical data reproduce historical lending discrimination. Postcode and zip-code correlates with race, encoding redlining patterns. Medical debt is structurally overrepresented among low-income populations. Score opacity prevents external audit of discriminatory effects.",
    desiredFutureDirection:
      "Prohibit use of credit scores in employment and housing screening. Shorten negative entry retention periods. Require contextual review mechanisms. Mandate transparent model documentation subject to independent audit.",
  },
  {
    title: "Post-Automation Labor Reallocation Audit",
    systemType: "labor",
    description:
      "Following large-scale automation of administrative, creative, and logistics roles, a national government has implemented an AI-managed labor reallocation system. The system assigns displaced workers to retraining programs, public sector roles, or income support tiers based on an 'adaptability index' and 'reallocation probability score.'",
    targetPopulation:
      "Workers displaced by automation across manufacturing, administrative, creative, and service sectors — approximately 3.4 million individuals in the first deployment phase, with 70% over age 40.",
    evaluationMechanism:
      "Composite 'adaptability index' drawn from age, prior educational attainment, performance on a standardized digital literacy assessment, psychometric personality inventory, and analysis of social network digital activity as a proxy for 'openness to change.'",
    dataSources:
      "National employment registry, educational credential databases, tax records, standardized digital literacy test administered via government portal, proprietary psychometric platform data, and anonymized mobile phone behavioral data purchased from telecom partners.",
    decisionConsequences:
      "High-adaptability scorers (top 25%) are offered funded university retraining with full income replacement. Mid-tier scorers (middle 50%) receive 18-month vocational programs with 60% income replacement. Low scorers (bottom 25%) receive 12 months of income support only, after which they enter a residual 'basic income review' process with no guaranteed outcome.",
    reentryMechanism:
      "Workers in the bottom tier may re-take the digital literacy assessment once per year. Psychometric scores are locked for 3 years. No mechanism exists to contest the social network digital activity component of the adaptability index.",
    appealMechanism:
      "A government portal accepts written appeals within 30 days of score notification. Appeals may only contest data entry errors, not the model's design or the validity of its input variables. Human review is not guaranteed; most appeals are processed algorithmically.",
    contextRecovery:
      "No formal mechanism exists for workers to explain circumstances behind low assessment performance — disability, caregiving responsibilities, prior trauma, language barriers, or lack of smartphone access. Contextual factors are not incorporated into scoring.",
    responsibilityAllocation:
      "The reallocation algorithm was procured from a private vendor under a confidentiality agreement. The government agency claims the vendor is responsible for model design; the vendor holds that deployment decisions are the government's responsibility. No party accepts accountability for systemic misclassification.",
    bodilyBurden:
      "Workers in the bottom tier face material loss of income, loss of occupational identity, and enforced participation in assessment processes they cannot meaningfully contest. Older workers, those with physical disabilities, and caregivers face disproportionate burdens from standardized digital assessment requirements.",
    knownRisks:
      "The psychometric personality inventory has documented lower 'openness' scores for older workers, workers with disabilities, and individuals from cultures with different orientations to institutional authority. Social network behavioral data is inaccessible to workers who do not use smartphones. Age is directly embedded as a scoring variable.",
    desiredFutureDirection:
      "Replace adaptability scoring with universal retraining entitlements. Establish democratic worker governance of reallocation program design. Prohibit age, social media behavior, and psychometric traits from determining public benefit access.",
  },
]
