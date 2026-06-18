import type { ICandidate } from "../types/types";

export function convertCandidateToProfileText(candidate: ICandidate) {
    let text = '';
    text += `Profile Info: Name: ${candidate.profile.anonymized_name}  Headline: ${candidate.profile.headline} Summary: ${candidate.profile.summary} Current Title: ${candidate.profile.current_title} \n
    Career History: ${candidate.career_history.map(ch => `Company: ${ch.company}, Title: ${ch.title}, Industry: ${ch.industry}, Description: ${ch.description}`).join('; ')} \n
    Education: ${candidate.education.map(ed => `Institution: ${ed.institution}, Degree: ${ed.degree}, Field of Study: ${ed.field_of_study}`).join('; ')} \n 
    Skills: ${candidate.skills.map(sk => `Skill: ${sk.name}`).join('; ')} \n`
    return text;
}