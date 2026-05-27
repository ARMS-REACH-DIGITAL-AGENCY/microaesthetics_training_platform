import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Clock } from "lucide-react";

// Slide content data for Chapter 1 - 33 slides from PowerPoint with Isabel's narration
const CHAPTER1_SLIDES = [
  {
    id: 1,
    title: "Chapter 1",
    subtitle: "Introduction to Laser Industry & AZ Laser Laws/Agencies",
    content: "LASER INTERN EDITION\n\nIsabel's Microaesthetics Laser Tech Institute",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/iHpJsnsfRTjohxNN.wav",
    audioDuration: 36,
  },
  {
    id: 2,
    title: "Laws of the Laser",
    subtitle: "Disclaimer",
    content: "MicroAesthetics Laser Education is a licensed laser training center governed by the Arizona Department of Health Services (ADHS) and the Arizona Radiation Regulatory Agency (ARRA). Cosmetic laser treatments are classified as health and beauty treatments to improve the overall appearance of the skin. Cosmetic laser treatments are NOT medical treatments and should not be depicted as such, in any way that could be misinterpreted by the public.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/PlSvIfGYFHoDpDhl.wav",
    audioDuration: 120,
  },
  {
    id: 3,
    title: "Laws of the Laser",
    subtitle: "Objectives",
    content: "By the end of this class, the student will have a clear understanding of:\n\n• Certified Laser Technician Definition\n• Arizona Rules and Regulations of Agencies Governing Cosmetic Lasers\n• Laser Trends\n• The purpose of the ANSI Agency\n• Additional Government Agencies\n• The 4 classifications of lasers\n• Laser Safety Manager Responsibility\n• When to File an Incident Report\n• Laser Key Safety\n\nNote: A quiz will be administered upon completion of the chapter. A passing score of 80% is needed to continue with the next chapter.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/KcxAerLrZYQYJERu.wav",
    audioDuration: 180,
  },
  {
    id: 4,
    title: "Laws of the Laser",
    subtitle: "Certified Laser Technician",
    content: "Who can perform laser and IPL treatments?\n\nCosmetic laser therapies are the processes of using light energy to treat imperfections and certain abnormalities skin conditions.\n\nEach state has its own requirements regarding:\n• Training Requirements\n• Laser School Curriculum and Criteria\n• Laser salons, medical spas, doctors' offices\n• Certification of people, training schools and facilities\n• Rules and regulations of use\n• Website for information on general regulations on a state-by-state basis\n• https://myethosspa.com",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/MvBVpfvpKQUlVIfe.wav",
    audioDuration: 60,
  },
  {
    id: 5,
    title: "Laws of the Laser",
    subtitle: "Certified Laser Technician",
    content: "The career of a certified laser technician (CLT)...\n\n• A certified laser technician is a person who is certified/licensed by a state agency to perform cosmetic procedures that rejuvenate the skin and treat problems such as unwanted hair, cellulite, and tattoos.\n\n• You must complete state training requirements for laser application, laser safety, wound healing, skin physiology and histology, and laser fundamentals.\n\n• Laser technician training programs typically award a certificate upon completion.\n\n• Other Requirements: State Licensure/Certification\n\n• Education required; depends on each state",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/vyaPNZbaHHHWHXfe.wav",
    audioDuration: 75,
  },
  {
    id: 6,
    title: "Laws of the Laser",
    subtitle: "Certified Laser Technician",
    content: "Career of a Certified Laser Technician\n\n• Governed by the Boards of Radiology and/or Department of Health Services of each state\n\n• Cosmetic/Medical Industry\n\n• Some states have prerequisites and some don't.\n\n• Individual states will govern who can perform laser services in the state; i.e., medical, nonmedical, and beauty professionals\n\n• Each state will govern the number of hours and procedures for each program within the laser criteria. Some last as little as 2 weeks.\n\nIn Arizona it is the Arizona Department of Health Services (ADHS) for certification and renewals and ARRA agency for facility and device licensing and registration.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/chrSMGphFdszMHAV.wav",
    audioDuration: 90,
  },
  {
    id: 7,
    title: "Laws of the Laser",
    subtitle: "Laser Trends",
    content: "Growth of the laser industry:\n\n• More than 2500 medical spas (Medi-spas or med-spas) opened in the United States alone in 2018\n\n• Industry of more than 10 billion dollars\n\n• More than $7 million was spent on Botox, dermal fillers, and laser hair removal in one year.\n\n• Employment opportunities include; specialty medical offices, dermatology, plastics, primary care practices, dental offices, obstetrics and gynecology clinics, working together with naturopathic doctors, gyms, hairdressers, beauty schools, and independent esthetician practices.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/cAKPjhwixoUtuNbK.wav",
    audioDuration: 75,
  },
  {
    id: 8,
    title: "Laws of the Laser CLT Career",
    subtitle: "Professional Growth",
    content: "Professional Growth:\n• According to the U.S. Labor Office, the estimated labor market growth for skincare specialists will be more than 30% through 2025.\n\nJob Opportunities:\n• The job market for Laser Technicians has been growing exponentially every year, with an expected increase of almost 21% by 2024.\n\nWage:\n• The average BASE salary for a laser technician is between $44,800 and $45,600 per year, or $16.95 per hour to $21 per hour.\n\nAdditional experience and certification in multiple specialties will increase your salary.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ITtCTsBpsskFMOdH.wav",
    audioDuration: 70,
  },
  {
    id: 9,
    title: "Laws of the Laser History of Cosmetic Lasers",
    subtitle: "Historical Timeline",
    content: "History of Cosmetic Laser Therapy:\n\n• 1959 - Gordon Gould coined the term LASER, Amplification of Light by Stimulated Emission of Radiation.\n\n• 1964 - Kumar Patel introduces the carbon dioxide (CO2) laser for use in dermatology.\n\n• 1997 – Dr. Anderson and Dr. Grossman developed an FDA-approved hair removal laser.\n\n• 2004 - Fractional laser technology focused on anti-aging symptoms such as wrinkles, loss of elasticity, and superficial scarring of the skin.\n\n• 2020s: Advances in laser technology over the decades have been shown to combat the biological aging process of conditions such as skin rejuvenation, tattoo removal, scar reduction, and vascular and pigmentary conditions.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ZSrfDaItVuoVOaHr.wav",
    audioDuration: 80,
  },
  {
    id: 10,
    title: "Laws of the Laser Cosmetic Lasers Treatments",
    subtitle: "Treatment Services",
    content: "Cosmetic Laser Services:\n\n• Acne scar reduction\n• Reduction of acquired hemangioma in adults\n• Cellulite reduction\n• Ephelis Reduction\n• Reduction of facial erythema\n• Hair Reduction\n• Laser peeling\n• Non-ablative skin resurfacing\n• Non-ablative tattoo removal\n• Skin Rejuvenation/Skin Tightening\n• Reduction of solar lentigo\n• Spider vein reduction\n• Reduction of telangiectasias\n• Wrinkle reduction",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/bGyGtIithjEqBKyg.wav",
    audioDuration: 65,
  },
  {
    id: 11,
    title: "Laws of the Laser Cosmetic Lasers Treatments",
    subtitle: "Skin Conditions Treated",
    content: "Skin conditions treated with lasers:\n\n• Acne scar reduction: With proper application, the laser has the ability to reduce depth of a scar or minimize the elevation of a keloid.\n\n• Adult Acquired Hemangioma Reduction: These are visible red blood spots found anywhere on the body and are more common in the elderly.\n\n• Cellulite reduction: A disorder of adipose tissue (fat cells) that gives a wavy appearance to the skin, usually on the buttocks and thighs.\n\n• Ephelis reduction: Similar to freckles, but can have a red and brown coloration, mainly due to intense sun exposure.\n\n• Reduction of facial erythema: Redness of the face due to vascular skin conditions such as rosacea and/or port-wine stains.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/mTRlmieVlNxjwVUY.wav",
    audioDuration: 85,
  },
  {
    id: 12,
    title: "Laws of the Laser Cosmetic Lasers Treatments",
    subtitle: "More Skin Conditions",
    content: "Skin conditions treated with lasers (continued):\n\n• Hair Reduction: Also known as hair removal that targets stem cells by removing the root of the hair shaft to stop hair growth with various treatments.\n\n• Laser Peel: Provides a topical exfoliation of dead skin cells by stimulating the integrity of collagen and elastin.\n\n• Non-ablative skin resurfacing: Laser treatments that penetrate deeper into the skin generating heat deeper than a laser peel such as a controlled burn without trauma to the upper layers of the skin.\n\n• Non-ablative tattoo removal: Calculated treatments performed with a laser beam on the skin to break up the tattoo ink.\n\n• Non-ablative lasers: Less invasive than their ablative counterpart for skin rejuvenation and photodamage to eliminate wrinkles, stimulate collagen and elastin and promote cell renewal.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/KouVSVBdzXtXAtyf.wav",
    audioDuration: 80,
  },
  {
    id: 13,
    title: "Laws of the Laser Cosmetic Lasers Treatments",
    subtitle: "Additional Skin Conditions",
    content: "Skin conditions treated with lasers (continued):\n\n• Skin tightening (resurfacing): Laser treatments that tighten the skin by stimulating fibroblasts to tighten the collagen/elastin network.\n\n• Solar lentigo reduction: The reduction of skin pigmentation from freckles or age spots caused by the sun.\n\n• Spider vein reduction: This differs from telangiectasia in that spider veins appear as thin, red lines or as web-like networks of blood vessels on the surface of the skin. Spider veins, a mild form of varicose veins, usually appear on the legs and feet.\n\n• Telangiectasia reduction: Also known as broken capillaries, they are small dilated blood vessels near the surface of the skin and are usually found on the face in the thinnest area of skin.\n\n• Wrinkle Reduction—Wrinkle reduction laser treatments that focus on minimizing lines and wrinkles on the face.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/pvriupuushsPfrGq.wav",
    audioDuration: 85,
  },
  {
    id: 14,
    title: "Laws of the Laser",
    subtitle: "Laws and Regulations",
    content: "The medical director, doctor, nurse practitioners, and CLT are all responsible for any mishaps of a patient.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/GyFxUQNHHIWezgwj.wav",
    audioDuration: 30,
  },
  {
    id: 15,
    title: "Laws of the Laser",
    subtitle: "Laws and Regulations",
    content: "AZ Agencies Governing Cosmetic Laser Technicians, Facilities and Technicians:\n\n• Arizona Department of Health Services\n\n• Arizona Radiology Regulatory Agency",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/HUspkHZJVDzRahSj.wav",
    audioDuration: 35,
  },
  {
    id: 16,
    title: "Laws of the Laser",
    subtitle: "Laws and Regulations",
    content: "Agencies that ensure laser safety:\n\n• American National Standards Institute (ANSI)\n• National Institute of Occupational Health (NIOH)\n• Center for Devices and Radiological Health\n• Joint Commission on Accreditation of Healthcare Organizations\n• Emergency Care Research Institute\n\nNIOSH: The National Institute of Occupational Health (NIOH) is a federal agency created by OSHA to ensure healthy working conditions.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/DkgeTwClWAoiUJuj.wav",
    audioDuration: 60,
  },
  {
    id: 17,
    title: "Laws of the Laser",
    subtitle: "Laws and Regulations",
    content: "American Society of Laser Medicine and Surgery (ASMLS):\n• Professional society dedicated to the improvement of scientific research, education, and the safe and effective use of lasers in medicine.\n\nOccupational Safety and Health Administration (OSHA):\n• Responsible for ensuring a safe workplace\n• Has legal compliance capabilities, uses ANSI or ASLMS recommendations\n\nFood and Drug Administration (FDA):\n• Responsible for implementing and enforcing the Federal Laser Product Performance Standard and the Medical Device Amendment to the Food, Drug, and Cosmetic Act (FDCA)\n• Involved in complying with laser safety guidelines as they relate to the manufacture and sale of these devices.\n• The FDA clears lasers for safe use in the marketplace, certifies them, and approves them.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/THBfQlIbysnuAAih.wav",
    audioDuration: 95,
  },
  {
    id: 18,
    title: "Laws of the Laser",
    subtitle: "Laws and Regulations",
    content: "American National Standards Institute (ANSI) ANSI Z136.3:\n\n• An organization of volunteer experts who participate in committees to set industry standards in various fields.\n\n• No legal authority\n\n• They developed the 4 laser hazard classifications\n\n• Used by OSHA and other federal agencies to set standards\n\n• ANSI Z136.1 is the standard for Safe Use of Lasers\n\n• ANSI Z136.3 is the standard for Laser Safety in Health Care Facilities",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/DbQbKJMOvTfUJUUW.wav",
    audioDuration: 75,
  },
  {
    id: 19,
    title: "Laws of the Laser",
    subtitle: "ANSI Laser Hazard Classifications",
    content: "ANSI Laser Hazard Classifications:\n\n• Class 1: Inherently safe - no hazard during normal use\n\n• Class 2: Low power visible light lasers (less than 1 mW) - safe because of the blink reflex\n\n• Class 3A: Medium power lasers (1-5 mW) - hazardous if viewed directly\n\n• Class 3B: High power lasers (5-500 mW) - hazardous if viewed directly or from specular reflections\n\n• Class 4: Very high power lasers (greater than 500 mW) - hazardous from direct beam, diffuse reflections, and scattered radiation",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/kEDfReuNYkokNXBI.wav",
    audioDuration: 85,
  },
  {
    id: 20,
    title: "Laws of the Laser",
    subtitle: "Laser Safety Officer",
    content: "Laser Safety Officer (LSO) Responsibilities:\n\n• Ensure compliance with laser safety regulations\n• Conduct laser safety training for all personnel\n• Maintain laser equipment and perform regular inspections\n• Manage incident reports and investigations\n• Establish and enforce laser safety protocols\n• Maintain records of laser use and maintenance\n• Coordinate with regulatory agencies\n• Ensure proper use of personal protective equipment (PPE)\n• Establish controlled areas and access restrictions\n• Conduct hazard assessments",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/cBdFIHCgLiyRNefp.wav",
    audioDuration: 80,
  },
  {
    id: 21,
    title: "Laws of the Laser",
    subtitle: "When to File an Incident Report",
    content: "When to File an Incident Report:\n\n• Any injury or adverse event related to laser use\n• Equipment malfunction or failure\n• Unauthorized laser use\n• Exposure to laser radiation beyond safe limits\n• Any near-miss incidents\n• Environmental hazards related to laser operation\n\nIncident Report Contents:\n• Date, time, and location of incident\n• Description of what happened\n• Personnel involved\n• Equipment involved\n• Injuries or damage\n• Corrective actions taken\n• Follow-up actions needed",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ppqaRAhpYXztuVpE.wav",
    audioDuration: 75,
  },
  {
    id: 22,
    title: "Laws of the Laser",
    subtitle: "Laser Signage - Red Danger Sign",
    content: "ANSI Class Laser Hazard Signage – Red Danger Sign\n\nRed = Laser is on and emitting, potential injury hazard.\n\nA red sign refers to \"DANGER\": A red light or sign often indicates that the laser is actively emitting a beam and that the area is potentially hazardous to enter. Red is universally associated with danger or potential injury, making it an effective warning color that is visible from a distance.\n\nSafety Status Indicators:\nRed = Laser is on and emitting, potential injury hazard.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 65,
  },
  {
    id: 23,
    title: "Laws of the Laser",
    subtitle: "Laser Signage - Yellow Caution Sign",
    content: "ANSI Class Laser Hazard Signage – Yellow Caution Sign\n\nYellow = Caution - potential hazard\n\nA yellow sign refers to \"CAUTION\": Yellow signs are used to indicate a potential hazard that is less severe than a \"DANGER\" situation. Yellow caution signs alert personnel to potential hazards related to laser operation, such as areas where laser beams may be present or where laser equipment is in use.\n\nKey uses for the yellow caution sign:\n• Areas where laser beams may scatter or reflect\n• Temporary laser work areas\n• Training areas with active lasers\n• Maintenance areas where lasers are being serviced",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 70,
  },
  {
    id: 24,
    title: "Laws of the Laser",
    subtitle: "Laser Signage - Orange Warning Sign",
    content: "ANSI Class Laser Hazard Signage – Orange Warning Sign\n\nOrange = Warning - hazard present\n\nAn orange sign refers to \"WARNING\": Orange warning signs indicate a hazard that is more serious than a caution but less severe than danger. Orange signs are typically used in areas where laser equipment is present and active, alerting personnel to be aware of potential hazards.\n\nKey uses for the orange warning sign:\n• Active laser work areas\n• Areas with Class 3B or Class 4 lasers\n• High-risk laser operation zones\n• Areas requiring protective equipment",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 70,
  },
  {
    id: 25,
    title: "Laws of the Laser",
    subtitle: "Laser Signage - Blue Notice Sign",
    content: "ANSI Class Laser Hazard Signage – Blue Notice Sign\n\nWhite letters with Blue background\n\nA blue sign refers to \"NOTICE\": sign is used to convey general information and instructions related to facility policies or procedures that are not directly associated with the risk of personal injury from the laser itself. It is distinct from the red \"DANGER\", orange \"WARNING\", or yellow \"CAUTION\" signs, which indicate escalating levels of potential injury hazards.\n\nKey uses for the blue notice sign:\n• Temporary Conditions: The sign is often posted outside a temporary laser-controlled area during specific non-routine activities.\n• Maintenance/Service: It is required when activities such as laser repair, maintenance, or alignment are in progress\n• General Procedures: Such as \"Laser Repair In Progress\", \"Unattended Laser Operation\", \"Alignment in Process\"",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 85,
  },
  {
    id: 26,
    title: "Laws of the Laser",
    subtitle: "Laser Signage Summary",
    content: "Laser Safety Signage Summary:\n\nRed = DANGER - Laser is on and emitting\nOrange = WARNING - Hazard present, active laser area\nYellow = CAUTION - Potential hazard, scattered beams\nBlue = NOTICE - General information and procedures\n\nAll signage must be:\n• Clearly visible and readable\n• Placed at all laser work areas\n• Maintained in good condition\n• Updated as needed for current hazards",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 60,
  },
  {
    id: 27,
    title: "Laws of the Laser",
    subtitle: "Laser Key Storage",
    content: "ANSI Device and Key Storage - General Safety Guidelines\n\nAccording to ANSI-Z136.3, laser keys should be stored in a secure area when the laser is not in use.\n\n• Never leave the laser in ready mode unattended.\n• Always turn off the system when not in use.\n• Never allow untrained personnel to operate the laser system.\n• Never press the foot switch without first checking that the handpiece is oriented securely.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 65,
  },
  {
    id: 28,
    title: "Laws of the Laser",
    subtitle: "Laser Key Storage Details",
    content: "ANSI Device and Key Storage - Safety Guidelines (Continued):\n\nCosmetic laser keys should be stored securely in a locked key cabinet or wall safe to ensure only authorized personnel have access. This is a crucial safety measure to prevent unauthorized operation of the high-powered laser equipment.\n\nSafety Guidelines:\n• Remove the key when not in use: The laser key must never be left in the laser unit when the machine is not in use.\n• Authorized Access Only: Only qualified and trained personnel should have access to the keys and operate the laser equipment.\n• Secure Location: The dedicated key storage unit should be located in a secure, controlled area with environmental controls.\n• Documented Procedure: Establish a clear, documented procedure for key sign-out/sign-in to maintain an audit trail.\n• Unattended Operation: If an operator needs to leave the room, the laser should be turned off, and the key should be removed and stored securely.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 95,
  },
  {
    id: 29,
    title: "Laws of the Laser",
    subtitle: "Personal Protective Equipment",
    content: "Personal Protective Equipment (PPE) for Laser Operations:\n\n• Laser Safety Glasses: Wavelength-specific eyewear that blocks laser radiation\n• Face Shield: Additional protection for the face and eyes\n• Protective Gloves: Heat-resistant gloves to protect hands\n• Protective Clothing: Long sleeves and pants to protect skin\n• Closed-Toe Shoes: To protect feet from laser hazards\n• Hair Covering: To prevent hair from entering the laser beam path\n\nAll PPE must be:\n• Properly fitted and comfortable\n• Maintained in good condition\n• Replaced when damaged\n• Used consistently during all laser operations",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 75,
  },
  {
    id: 30,
    title: "Laws of the Laser",
    subtitle: "Laser Safety Best Practices",
    content: "Laser Safety Best Practices:\n\n• Never look directly into a laser beam\n• Never point a laser at anyone\n• Always wear appropriate PPE\n• Keep laser work areas clean and organized\n• Maintain equipment regularly\n• Follow all manufacturer guidelines\n• Report all incidents immediately\n• Participate in regular safety training\n• Keep emergency equipment accessible\n• Maintain proper documentation\n• Ensure proper ventilation in work areas\n• Use laser barriers and shields when appropriate",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 80,
  },
  {
    id: 31,
    title: "Laws of the Laser",
    subtitle: "Chapter Summary",
    content: "Chapter 1 Summary:\n\nYou have learned about:\n• The definition and career of a Certified Laser Technician\n• Arizona regulations and governing agencies\n• Laser industry trends and growth opportunities\n• ANSI laser classifications and safety standards\n• Government agencies that regulate laser use\n• Laser Safety Officer responsibilities\n• Incident reporting procedures\n• Laser signage and safety indicators\n• Key storage and security\n• Personal protective equipment\n• Laser safety best practices\n\nThis knowledge is essential for safe and compliant laser operation in Arizona.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 80,
  },
  {
    id: 32,
    title: "Laws of the Laser",
    subtitle: "Review & Quiz",
    content: "Prepare for Chapter 1 Quiz\n\nYou have completed all the content for Chapter 1.\n\nNow it's time to test your knowledge with the Chapter 1 Quiz.\n\nRemember:\n• You must score 80% or higher to pass\n• You can retake the quiz if needed\n• Review the slides as many times as you need\n• Pay attention to the narration - answers may only be spoken\n\nGood luck!",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 45,
  },
  {
    id: 33,
    title: "Chapter 1 Complete",
    subtitle: "Next Steps",
    content: "Congratulations on completing Chapter 1!\n\nYou have successfully learned about:\n• Laser industry fundamentals\n• Arizona regulations and compliance\n• Safety standards and classifications\n• Professional responsibilities\n\nNext Steps:\n1. Review your quiz results\n2. If you scored 80% or higher, you're ready for Chapter 2\n3. If you need to improve, review the slides and retake the quiz\n4. Continue with your training journey\n\nThank you for your dedication to laser safety and professional excellence!",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 60,
  },
];

export default function Chapter1Training() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioFinished, setAudioFinished] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [slideStartTime, setSlideStartTime] = useState<Date | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slide = CHAPTER1_SLIDES[currentSlide];
  const totalSlides = CHAPTER1_SLIDES.length;
  const completionPercentage = Math.round(((currentSlide + 1) / totalSlides) * 100);

  // Initialize session on mount
  useEffect(() => {
    const now = new Date();
    setSessionStartTime(now);
    setSlideStartTime(now);

    // Start real clock timer
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Update slide start time when slide changes
  useEffect(() => {
    setSlideStartTime(new Date());
    setAudioFinished(false);
  }, [currentSlide]);

  // Format time display (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Handle slide changes - ONLY allow next if audio finished
  const handleNextSlide = () => {
    if (currentSlide < totalSlides - 1 && audioFinished) {
      setCurrentSlide(currentSlide + 1);
      setIsPlaying(false);
      setProgress(0);
    }
  };

  // Prevent going backward
  const handlePreviousSlide = () => {
    // Disabled - cannot go backward in compliance mode
  };

  // Prevent direct slide clicking
  const handleSlideClick = (index: number) => {
    // Disabled - cannot skip slides in compliance mode
  };

  // Handle audio playback
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  // Auto-advance to next slide when audio ends
  const handleAudioEnd = () => {
    setIsPlaying(false);
    setAudioFinished(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Real Clock */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Chapter 1: Introduction to Laser Industry Laws & Agencies
              </h1>
              <p className="text-lg text-slate-600">
                Slide {currentSlide + 1} of 33
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-semibold">Session Time</span>
              </div>
              <div className="text-3xl font-bold text-teal-600">
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Slide Viewer */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg overflow-hidden">
              {/* Slide Content */}
              <div className="bg-gradient-to-br from-teal-50 to-slate-50 p-12 min-h-96 flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-slate-900 mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-xl text-teal-600 font-semibold">
                    {slide.subtitle}
                  </p>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {slide.content}
                </p>
              </div>

              {/* Audio Player */}
              <div className="bg-slate-900 text-white p-6">
                <audio
                  ref={audioRef}
                  src={slide.audioFile}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleAudioEnd}
                  className="hidden"
                />

                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={togglePlayPause}
                    className="flex-shrink-0 bg-teal-600 hover:bg-teal-700 p-3 rounded-full transition"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  {/* Progress Bar */}
                  <div className="flex-1">
                    <div className="bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="flex-shrink-0 text-slate-300 hover:text-white transition"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-sm text-slate-400 text-center">
                  Click play to hear Isabel's expert narration
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="bg-slate-100 p-6 flex gap-4">
                <Button
                  variant="outline"
                  disabled
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNextSlide}
                  disabled={!audioFinished || currentSlide === totalSlides - 1}
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Progress & Info */}
          <div>
            <Card className="bg-white shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Your Progress
              </h3>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-600">
                    Completion
                  </span>
                  <span className="text-lg font-bold text-teal-600">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-teal-600 h-3 rounded-full transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4">
                Slide {currentSlide + 1} of 33
              </p>

              <p className="text-xs text-slate-500 mb-4">
                Progress only moves forward
              </p>
            </Card>

            <Card className="bg-white shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Compliance Mode
              </h3>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm text-slate-700">
                    All time is tracked
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm text-slate-700">
                    Cannot skip slides
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm text-slate-700">
                    Cannot go backward
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm text-slate-700">
                    Must finish audio
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-600 text-sm">
          <p>
            Narrated by Isabel • 33 slides • Approximately 45-60 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
