import { Topic } from '@/constants/topic';

export interface TopicCardSectionTitleProps {
	type: Topic;
}

export const TopicCardSectionTitle = ({ type }: TopicCardSectionTitleProps) => {
	if (type === 'problem')
		return (
			<h3 className="bg-topic-problem text-b6 sticky top-2.5 z-10 rounded-full px-2.5 py-[5px] font-bold">
				ปัญหาคืออะไร (Problem)
			</h3>
		);
	if (type === 'action')
		return (
			<h3 className="bg-topic-action text-b6 sticky top-2.5 z-10 rounded-full px-2.5 py-[5px] font-bold">
				จะทำอะไร (Action)
			</h3>
		);
	if (type === 'outcome_indicator')
		return (
			<h3 className="bg-topic-outcome text-b6 sticky top-2.5 z-10 rounded-full px-2.5 py-[5px] font-bold">
				ผลลัพธ์คืออะไร (Outcome)
			</h3>
		);
	if (type === 'target')
		return (
			<h3 className="bg-topic-target text-b6 sticky top-2.5 z-10 rounded-full px-2.5 py-[5px] font-bold">
				ใครได้ประโยชน์ (Target)
			</h3>
		);
	if (type === 'timeframe')
		return (
			<h3 className="bg-topic-timeframe text-b6 sticky top-2.5 z-10 rounded-full px-2.5 py-[5px] font-bold">
				ภายในเมื่อไหร่ (Timeframe)
			</h3>
		);
	if (type === 'budget')
		return (
			<h3 className="bg-topic-budget text-b6 sticky top-2.5 z-10 rounded-full px-2.5 py-[5px] font-bold">
				ใช้งบเท่าไหร่ (Budget)
			</h3>
		);
	if (type === 'budget_source')
		return (
			<h3 className="bg-topic-budget-src text-b6 sticky top-2.5 z-10 rounded-full px-2.5 py-[5px] font-bold">
				งบมาจากไหน (Budget Source)
			</h3>
		);
};
