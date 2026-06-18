export type ICandidate = {
	candidate_id: string;
	profile: {
		anonymized_name: string;
		headline: string;
		summary: string;
		location: string;
		country: string;
		years_of_experience: number;
		current_title: string;
		current_company: string;
		current_company_size: string;
		current_industry: string;
	};
	career_history: {
		company: string;
		title: string;
		start_date: string;
		end_date: string | null;
		duration_months: number;
		is_current: boolean;
		industry: string;
		company_size: string;
		description: string;
	}[];
	education: {
		institution: string;
		degree: string;
		field_of_study: string;
		start_date: string;
		end_date: string;
		grade: string;
		tier: string;
	}[];
	skills: {
		name: string;
		proficiency: string;
		endorsements: number;
		duration_months: number;
	}[];
	languages: {
		language: string;
		proficiency: string;
	}[];
	redrob_signals: {
		profile_completeness_score: number;
		signup_date: string;
		last_active_date: string;
		open_to_work_flag: boolean;
		profile_views_received_30d: number;
		applications_submitted_30d: number;
		recruiter_response_rate: number;
		avg_response_time_hours: number;
		skill_assessment_scores: {
			[key: string]: number;
		};
		connection_count: number;
		endorsements_received: number;
		notice_period_days: number;
		expected_salary_range_inr_lpa: {
			min: number;
			max: number;
		};
		preferred_work_mode: string;
		willing_to_relocate: boolean;
		github_activity_score: number;
		search_appearance_30d: number;
		saved_by_recruiters_30d: number;
		interview_completion_rate: number;
		offer_acceptance_rate: number;
		verified_email: boolean;
		verified_phone: boolean;
		linkedin_connected: boolean;
	};
};
