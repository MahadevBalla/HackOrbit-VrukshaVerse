import { Plant } from './types';

export const plants: Plant[] = [
    {
        id: 1,
        name: 'Tulsi',
        scientificName: 'Ocimum tenuiflorum',
        region: 'India',
        description:
            'Known as Holy Basil, Tulsi is revered in Ayurveda for its healing properties and spiritual significance. This sacred herb helps with respiratory issues, improving lung function and easing symptoms of asthma and bronchitis. It supports healthy digestion by stimulating digestive enzymes and reducing gastric disorders. Tulsi is renowned for boosting immunity through its adaptogenic properties, helping the body resist stress and infections. The herb contains compounds like eugenol and rosmarinic acid that provide anti-inflammatory, antimicrobial, and antioxidant benefits. Regular consumption helps regulate blood sugar levels, supports heart health, and promotes mental clarity while reducing anxiety and stress-related symptoms.',
        image: require('@/assets/images/tulsi.jpg'),
        audioUrl: '',
    },
    {
        id: 2,
        name: 'Amla',
        scientificName: 'Phyllanthus emblica',
        region: 'India, Southeast Asia',
        description:
            'Amla, or Indian Gooseberry, is one of the richest natural sources of Vitamin C, containing 20 times more than oranges. This superfruit is known for dramatically improving immunity by enhancing white blood cell production and antibody formation. It promotes radiant skin health by stimulating collagen production, reducing signs of aging, and providing natural sun protection through its antioxidant properties. Amla supports healthy digestion by improving nutrient absorption, reducing acidity, and promoting beneficial gut bacteria. The fruit helps regulate blood sugar levels, supports liver detoxification, and strengthens hair follicles, preventing premature graying and hair loss. Its tannins and flavonoids provide powerful anti-inflammatory effects throughout the body.',
        image: require('@/assets/images/amla.jpg'),
        audioUrl: '',
        model3dUrl: '@/assets/models/amla.glb',
    },
    {
        id: 3,
        name: 'Ashwagandha',
        scientificName: 'Withania somnifera',
        region: 'India, Middle East',
        description:
            'Ashwagandha is a powerful adaptogen that helps the body cope with physical, mental, and emotional stress by regulating cortisol levels. This ancient herb significantly boosts energy and stamina by supporting adrenal function and improving cellular energy production. It enhances cognitive health by promoting neuroplasticity, improving memory formation, and protecting brain cells from oxidative damage. Ashwagandha supports healthy sleep patterns, reduces anxiety and depression symptoms, and helps balance thyroid function. The herb also promotes muscle strength and recovery, making it popular among athletes. Its withanolides provide anti-inflammatory benefits and support healthy testosterone levels in men and hormonal balance in women.',
        image: require('@/assets/images/ashwagandha.jpg'),
        audioUrl: '',
        model3dUrl: '@/assets/models/ashwagandha.glb',
    },
    {
        id: 4,
        name: 'Bhringraj',
        scientificName: 'Eclipta alba',
        region: 'India',
        description:
            'Bhringraj, known as the "King of Hair," is traditionally used for promoting hair growth, preventing premature graying, and treating scalp conditions like dandruff and hair fall. The herb supports liver detoxification by enhancing bile production and protecting liver cells from toxins and free radical damage. Its powerful anti-inflammatory properties help reduce inflammation in joints, muscles, and throughout the body. Bhringraj possesses strong antimicrobial properties that help fight bacterial and fungal infections. The herb also supports eye health, improves circulation, and helps maintain healthy blood pressure levels. Its coumestans and flavonoids provide hepatoprotective effects and support overall metabolic health.',
        image: require('@/assets/images/bhringraj.jpg'),
        audioUrl: '',
    },
    {
        id: 5,
        name: 'Brahmi',
        scientificName: 'Bacopa monnieri',
        region: 'India, Australia, Europe',
        description:
            'Brahmi is a renowned brain tonic that enhances memory formation, retention, and recall by promoting the growth of nerve endings and improving neurotransmitter function. This nootropic herb significantly reduces anxiety and stress by modulating stress hormone levels and promoting a calm, focused mental state. It improves mental clarity and concentration by enhancing blood flow to the brain and protecting neurons from oxidative stress. Brahmi supports learning ability by improving information processing speed and cognitive flexibility. The herb also helps with ADHD symptoms, promotes restful sleep, and supports overall nervous system health. Its bacosides provide neuroprotective benefits and may help prevent age-related cognitive decline.',
        image: require('@/assets/images/brahmi.jpg'),
        audioUrl: '',
        model3dUrl: '@/assets/models/brahmi.glb',
    },
    {
        id: 6,
        name: 'Giloy',
        scientificName: 'Tinospora cordifolia',
        region: 'Tropical India',
        description:
            'Giloy, also called Amrita meaning "nectar of life," is a powerful immunity booster that enhances the body\'s natural defense mechanisms against infections and diseases. This versatile herb is widely used to treat chronic fever by addressing underlying infections and supporting the body\'s healing processes. It helps manage diabetes by improving insulin sensitivity and regulating blood glucose levels naturally. Giloy effectively treats respiratory issues including asthma, cough, and bronchitis by reducing inflammation in the respiratory tract. The herb supports liver health, aids in detoxification, and helps manage arthritis symptoms through its anti-inflammatory properties. Its alkaloids and glycosides provide adaptogenic benefits, helping the body cope with stress and environmental toxins.',
        image: require('@/assets/images/giloy.jpg'),
        audioUrl: '',
    },
    {
        id: 7,
        name: 'Kadipatta',
        scientificName: 'Murraya koenigii',
        region: 'India, Sri Lanka',
        description:
            'Kadipatta, commonly known as Curry Leaves, is a culinary herb that supports digestive health by stimulating digestive enzymes and reducing gastric irritation. The leaves effectively regulate blood sugar levels by improving insulin function and glucose metabolism, making them beneficial for diabetic management. Rich in antioxidants including vitamin A, B, C, and E, curry leaves protect cells from free radical damage and support overall health. They promote healthy hair growth, prevent premature graying, and strengthen hair follicles when used both internally and externally. Kadipatta supports heart health by helping reduce cholesterol levels and improving circulation. The herb also aids in weight management, supports liver function, and provides anti-inflammatory benefits throughout the body.',
        image: require('@/assets/images/kadipatta.webp'),
        audioUrl: '',
    },
    {
        id: 8,
        name: 'Neem',
        scientificName: 'Azadirachta indica',
        region: 'India, Nepal, Pakistan',
        description:
            'Neem is a versatile medicinal tree with powerful antibacterial, antifungal, and anti-inflammatory properties that make it effective against a wide range of infections and skin conditions. Used extensively in skin care, neem treats acne, eczema, psoriasis, and various fungal infections while promoting healthy, clear skin. The herb is excellent for building immunity by enhancing white blood cell function and supporting the body\'s natural defense mechanisms. Neem helps regulate blood sugar levels, supports liver detoxification, and aids in wound healing through its antimicrobial properties. It also acts as a natural pesticide, supports oral health by fighting bacteria that cause gum disease, and helps purify the blood. The compounds like nimbidin and azadirachtin provide potent therapeutic benefits for both internal and external use.',
        image: require('@/assets/images/neem.jpg'),
        audioUrl: '',
        model3dUrl: '../assets/models/neem_plant.glb',
    },
    {
        id: 9,
        name: 'Shatavari',
        scientificName: 'Asparagus racemosus',
        region: 'India, Sri Lanka, Himalayas',
        description:
            'Shatavari is an important herb for women\'s health that supports reproductive health throughout all stages of a woman\'s life, from puberty through menopause. This adaptogenic herb promotes healthy lactation in nursing mothers by enhancing milk production and quality. It helps maintain hormonal balance by supporting the endocrine system and regulating estrogen levels naturally. Shatavari alleviates menstrual discomfort, reduces PMS symptoms, and supports fertility by nourishing the reproductive organs. The herb also benefits digestive health, acts as a natural aphrodisiac, and helps manage stress and anxiety. Its saponins and flavonoids provide anti-inflammatory and antioxidant benefits, while also supporting immune function and overall vitality in both men and women.',
        image: require('../assets/images/shatavari.jpg'),
        audioUrl: '',
    },
    {
        id: 10,
        name: 'Aloe Vera',
        scientificName: 'Aloe barbadensis miller',
        region: 'Worldwide (tropical)',
        description:
            'Aloe Vera is renowned for its exceptional skin healing properties, providing immediate relief for burns, cuts, wounds, and various skin irritations through its anti-inflammatory compounds. The gel provides intense moisturizing benefits, penetrating deep into skin layers to hydrate and repair damaged cells. Its cooling effects make it ideal for treating sunburn, rashes, and inflammatory skin conditions. Aloe Vera supports healthy digestion by soothing the digestive tract, reducing acid reflux, and promoting beneficial gut bacteria growth. The plant boosts immunity through its polysaccharides and helps regulate blood sugar levels. Rich in vitamins, minerals, and amino acids, Aloe Vera promotes collagen production, accelerates wound healing, and provides natural antimicrobial protection against harmful bacteria and fungi.',
        image: require('@/assets/images/aloe-vera.jpg'),
        audioUrl: '',
        model3dUrl: '@/assets/models/aloe_vera_plant.glb',
    },
];