export default () => {
	return Promise.resolve({
		legalMaterial:
			'http://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000017765090',
		prefLabelLg1: "Nomenclature d'activités française - NAF rév. 2",
		additionalMaterial:
			'http://www.insee.fr/fr/methodes/nomenclatures/revision_naf_2008/doc/guide_naf_cpf_rev_2.pdf',
		scopeNoteLg1:
			"<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>Les nomenclatures d'activités et de produits ont été élaborées principalement en vue de faciliter l'organisation de l'information économique et sociale. Leur finalité est donc essentiellement statistique et d'ailleurs les critères d'ordre juridique ou institutionnel sont écartés en tant que tels dans leur construction. La NAF, nomenclature d'activités française, est une nomenclature des activités économiques productives. La CPF, classification des produits française, vise à classer les biens et les services issus des activités économiques.</p><p>Pour chaque code NAF, un lien avec la CPF permet de visualiser les codes et intitulés des produits associés à chaque activité et d'accéder à l'ensemble de la CPF. Ces codes et intitulés ont été actualisés pour tenir compte de la mise à jour de la CPF au 1er janvier 2015 (CPF rév. 2.1.). La NAF et la CPF constituent une infrastructure offerte à tous, permettant des classements économiques. Des précautions sont toutefois à prendre lors d'utilisations non statistiques des nomenclatures (lien vers circulaire ministérielle). En particulier, comme le précise l'article 5, alinéa 1 du décret 2007-1888, \"<span class=\"italique\">L'attribution par l'Institut national de la statistique et des études économiques (INSEE), à des fins statistiques, d'un code caractérisant l'activité principale exercée (APE) en référence à la nomenclature d'activités ne saurait suffire à créer des droits ou des obligations en faveur ou à charge des unités concernées</span>\".</p></div>",
		descriptionLg2:
			'The activities and products classifications have been developed mainly to facilitate the organization of economic and social information. Their purpose is essentially statistical. The French nomenclature of activities (NAF), is a classification of productive economic activities. It has an tree structure with 5 nested levels. The French classification of products (CPF), aims to classify the goods and services resulting from the economic activities. Its tree structure with 6 levels is nested in the structure of NAF. The navigation within these two nomenclatures allows to browse from one to the other.',
		descriptionLg1:
			"Les nomenclatures d'activités et de produits ont été élaborées principalement en vue de faciliter l'organisation de l'information économique et sociale. Leur finalité est essentiellement statistique. La NAF, nomenclature d'activités française, est une nomenclature des activités économiques productives. Elle a une structure arborescente à 5 niveaux emboîtés. La CPF, classification des produits française, vise à classer les biens et les services issus des activités économiques ; sa structure arborescente à 6 niveaux est emboîtée dans celle de la NAF. La navigation dans ces deux nomenclatures permet de passer de l'une à l'autre.",
		lastRefreshedOn: '2016-12-13T00:00:00.000+01:00',
		changeNoteLg1:
			'<div xmlns="http://www.w3.org/1999/xhtml"><p>La nouvelle nomenclature d\'activités française NAF rév. 2 (ou " NAF 2008 ") est la déclinaison française de la nomenclature d\'activités européenne révisée NACE rév. 2 (voir le site d\'Eurostat consacré à la révision 2008), dans laquelle elle est emboîtée.</p><p>Si les principaux concepts ont été peu modifiés, leur application fait moins souvent appel que précédemment à l\'usage de conventions et l\'articulation entre activités, produits et biens échangés suivis dans les nomenclatures douanières est légèrement assouplie. La taille de la nouvelle NAF est légèrement plus importante que celle de la précédente (732 postes au niveau le plus détaillé, celui des sous-classes, contre 712 actuellement). La nomenclature française se rapproche également de la nomenclature européenne : la refonte de la NACE et son affinement (615 classes contre 514 actuellement) permettent de prendre en compte certaines spécificités structurelles françaises et rendent ainsi inutile l\'ajout de subdivisions purement nationales.</p><p>La structure des nomenclatures d\'activités est sensiblement modifiée au profit des services d\'une part, des activités à fort contenu technologique d\'autre part. Elle connaît quatre bouleversements principaux :</p><ul class="list1"><li><p>la création de deux sections transversales, l\'une (section <a href="http://bauhaus/codes/nafr2/section/J">J</a>) relative à l\'information et à la communication (production, distribution, traitement et transmission de l\'information et des produits culturels), l\'autre (section <a href="http://bauhaus/codes/nafr2/section/E">E</a>) à l\'environnement (captage et distribution d\'eau, assainissement, collecte et gestion des déchets, dépollution)</p></li><li><p>la création d\'une division (division <a href="http://bauhaus/codes/nafr2/division/26">26</a>) pour les industries des technologies de l\'information et de la communication (Tic) reflétant la convergence technologique entre les industries de l\'informatique, des télécommunications et de l\'audiovisuel</p></li><li><p>la séparation, parmi les services rendus principalement aux entreprises, entre " activités spécialisées, scientifiques et techniques " (section <a href="http://bauhaus/codes/nafr2/section/M">M</a>) et " activités de services administratifs et de soutien " (section <a href="http://bauhaus/codes/nafr2/section/N">N</a>) </p></li><li><p>l\'identification systématique des activités d\'entretien et de réparation, par une division de l\'industrie manufacturière pour les biens d\'équipement (division <a href="http://bauhaus/codes/nafr2/division/33">33</a>), par un groupe du commerce pour l\'automobile (groupe <a href="http://bauhaus/codes/nafr2/groupe/45.2">45.2</a>) et par une division des services pour les ordinateurs et les biens personnels et domestiques (division <a href="http://bauhaus/codes/nafr2/division/95">95</a>)</p></li></ul></div>',
		id: 'nafr2',
		altLabelLg2: '',
		disseminationStatus:
			'http://bauhaus/codes/base/statutDiffusion/PublicGenerique',
		altLabelLg1: 'NAF rév. 2, 2008 || NAF rév. 2, 2008 (édition 2015)',
		issued: '2008-01-01T00:00:00.000+01:00',
	});
};