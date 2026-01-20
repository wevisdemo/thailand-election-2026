import {
	Spreadsheet,
	Object as Obj,
	Column,
	asString,
	asArray,
} from 'npm:sheethuahua@3.2.0';

const sheet = Spreadsheet('1ckxqxZXNXANUdzX1Heu1rj17kFNEKnlsago1OBn9r3M');

export const getPartyInfo = () =>
	sheet.get(
		'PartyInfo',
		Obj({
			name: Column('PartyName', asString()),
			pastGovernmentPeriods: Column(
				'pastAssembly_government',
				asArray(asString(), '\n').optional([]),
			),
			pastOppositionPeriods: Column(
				'pastAssembly_opposition',
				asArray(asString(), '\n').optional([]),
			),
			policyUrl: Column('policyURL', asString().optional()),
			billUrl: Column('lawwatchURL', asString().optional()),
			websiteUrl: Column('partywebsiteURL', asString().optional()),
		}),
	);
