export const LANG_CONFIG = {
    ta: {
        label: "தமிழ்", flag: "🇮🇳", bcp: "ta-IN", geminiLang: "Tamil",
        nav: { home: "முகப்பு", soil: "மண்", crops: "பயிர்", scan: "படம்", market: "சந்தை", voice: "குரல்", schemes: "திட்டங்கள்" },
        common: { season: "பருவம்", state: "மாநிலம்", search: "தேடுங்கள்..." },
        voice: {
            title: "🎙️ குரல் & Chat",
            greeting: ["காலை வணக்கம் 🌅", "மதிய வணக்கம் ☀️", "மாலை வணக்கம் 🌙"],
            farmAssistant: "AI பண்ணை உதவியாளர்",
            tapSpeak: "தட்டி பேசுங்கள்",
            listening: "கேட்கிறேன்...",
            typeHere: "இங்கே தட்டச்சு செய்யுங்கள்...",
            quickQ: ["என் மண்ணுக்கு எந்த பயிர்?", "இலை மஞ்சளாகிறது ஏன்?", "நெல்லுக்கு என்ன உரம்?", "இன்று அரிசி விலை என்ன?", "தண்ணீர் எப்போது ஊற்றணும்?", "பூச்சி தாக்குதல் எப்படி தடுப்பது?"],
            welcome: "வணக்கம்! 🙏 நான் உங்கள் AgriSense உதவியாளர். பயிர், மண், நோய், விலை பற்றி கேளுங்கள்!",
            voiceNotSupported: "உங்கள் உலாவியில் குரல் ஆதரவு இல்லை. தட்டச்சு செய்யுங்கள்.",
            voiceError: "குரல் கேட்கப்படவில்லை. மீண்டும் முயற்சிக்கவும்.",
            changeLang: "மொழி மாற்று",
            start: "தொடங்குகிறது...", tapStop: "மீண்டும் தட்டினால் நிறுத்தும்", hint: "பேசுங்கள் அல்லது தட்டச்சு",
            quickTitle: "⚡ விரைவு கேள்விகள்"
        },
        dash: {
            live: "🟢 நேரடி | LIVE",
            farmer: "Farmer! 👋",
            temp: "வெப்பம்\nTemp", humid: "ஈரப்பதம்\nHumid", rain: "மழை வாய்ப்பு\nRain",
            wxTitle: "🌤️ வானிலை | Weather",
            farmTitle: "📊 பண்ணை நிலை | Farm",
            cropTitle: "🌾 சிறந்த பயிர்கள் | Crops",
            advTitle: "இன்றைய அறிவுரை | Advisory",
            rRisk: "அபாய நிலை\nRisk Level", rRiskSub: "நல்ல நிலை",
            rProf: "லாப மதிப்பீடு\nEst. Profit", rProfSub: "ஒரு ஏக்கர்",
            rPest: "பூச்சி எச்சரிக்கை\nPest Alert", rPestSub: "பாதுகாப்பு",
            rWater: "நீர் தேவை\nWater Need", rWaterSub: "இந்த வாரம்",
        },
        soil: {
            title: "🪨 மண் பரிசோதனை | Soil", subtitle: "உங்கள் மண் விவரங்களை உள்ளிடுங்கள்",
            params: "🧪 மண் அளவுகள்", ph: "🌡️ அமிலத்தன்மை | pH", n: "🌿 நைட்ரஜன் | N", p: "⚗️ பாஸ்பரஸ் | P", k: "🔬 பொட்டாசியம் | K",
            moist: "💧 ஈரப்பதம் | Moisture %", type: "🪨 மண் வகை | Type",
            btn: "🔬 மண் பரிசோதனை", btnLoad: "பரிசோதிக்கிறது…",
            health: "மண் ஆரோக்கியம்",
            insights: "💡 AI அறிவுரை", warn: "எச்சரிக்கை", amend: "🌿 சேர்க்க வேண்டியவை", crops: "🌾 ஏற்ற பயிர்கள்"
        },
        crops: {
            title: "🌱 பயிர்கள் | Crops", subtitle: "AI திட்டம் · அனைத்து பயிர்களும்",
            tabAI: "🤖 AI திட்டம்\nAI Portfolio", tabAll: "🌾 அனைத்து பயிர்கள்\nAll Crops",
            farmDet: "🚜 பண்ணை விவரம்", land: "🌾 நிலம் (acres)", budget: "💵 பட்ஜெட் (₹)",
            btn: "🤖 AI திட்டம் உருவாக்கு", btnLoad: "திட்டம் உருவாக்குகிறது…",
            port: "📋 PORTFOLIO STRATEGY", inv: "முதலீடு\nInvestment", prof: "எதிர்பார்க்கும் லாபம்\nProfit",
            yield: "விளைச்சல்\nYield", roi: "வருவாய்\nROI", cost: "செலவு\nCost", risk: "Risk",
            tips: "💡 நிபுணர் ஆலோசனை",
            search: "பயிர்களை தேடுங்கள்...", all: "அனைத்தும்", found: "பயிர்கள்", no: "பயிர் கிடைக்கவில்லை", noSub: "No crops found",
            water: "💧 Water", soil: "🪨 Soil", npk: "⚗️ NPK", cyield: "📦 Yield", dur: "📅 Duration", cprice: "💰 Price",
            dis: "⚠️ பொதுவான நோய்கள்", cprof: "📈 லாப நிலை | Profitability:"
        },
        scan: {
            title: "📷 தாவர பரிசோதனை | Scan", subtitle: "படம் எடுத்து நோய் கண்டறியுங்கள்",
            upTitle: "தாவர படம் எடுங்கள்\nUpload Photo", upSub: "இலை · தண்டு · காய்",
            btn: "🔬 நோய் கண்டறி", btnLoad: "பரிசோதிக்கிறது…", btnChg: "📷 வேறு படம்",
            id: "🌿 தாவர அடையாளம்", detect: "கண்டறியப்பட்டது | Detected", cond: "Confidence", sev: "Severity",
            cause: "காரணம்", symp: "🔍 அறிகுறிகள் | Symptoms", fert: "🧪 உரங்கள்", treat: "💊 சிகிச்சை | Treatment",
            recov: "குணமாகும் நேரம்\nRecovery Time", prev: "தடுப்பு\nPrevention",
            homeRem: "🍃 இயற்கை வைத்தியம் | Home Remedy", chemSol: "🧪 ரசாயன தீர்வு | Chemical Sol", shop: "🏪 அருகில் உள்ள கடைகள் | Nearby Shops"
        },
        market: {
            title: "📊 சந்தை விலை | Market", subtitle: "மண்டி விலை · AI முன்னறிவிப்பு",
            cropSel: "🌾 பயிர் தேர்வு", crop: "🌱 பயிர்",
            btn: "📈 சந்தை விலை பெறு", btnLoad: "விலை பெறுகிறது…",
            d30: "30 நாள்\n30-Day", d60: "60 நாள்\n60-Day", msp: "MSP மேல்\nAbove MSP",
            mandis: "🏪 அருகில் உள்ள மண்டிகள் | Mandis", adv: "💡 AI அறிவுரை", fac: "📰 விலை காரணங்கள்",
            vol: "volatility"
        },
        wx: {
            na: "⚠️ Weather not available", feels: "Feels", rainW: "⚠️ மழை வருகிறது | Rain today — avoid field work",
            heatW: "🌡️ வெப்பம் அதிகம் | Extreme heat — water your crops", today: "Today"
        }
    },
    en: {
        label: "English", flag: "🇬🇧", bcp: "en-IN", geminiLang: "English",
        nav: { home: "Home", soil: "Soil", crops: "Crops", scan: "Scan", market: "Market", voice: "Voice", schemes: "Schemes" },
        common: { season: "Season", state: "State", search: "Search..." },
        voice: {
            title: "🎙️ Voice & Chat",
            greeting: ["Good Morning 🌅", "Good Afternoon ☀️", "Good Evening 🌙"],
            farmAssistant: "AI Farm Assistant",
            tapSpeak: "Tap & Speak", listening: "Listening...", typeHere: "Type your question here...",
            quickQ: ["Best crop for my soil?", "Why leaves turning yellow?", "Fertilizer for paddy?", "Rice price today?", "When to irrigate?", "How to control pests?"],
            welcome: "Hello! 🙏 I'm your AgriSense AI farming assistant. Ask about crops, soil, diseases, or prices!",
            voiceNotSupported: "Voice not supported in this browser. Please type your question.",
            voiceError: "Couldn't hear you. Please try again.",
            changeLang: "Change Lang", start: "Starting...", tapStop: "Tap again to stop", hint: "Speak or type",
            quickTitle: "⚡ Quick Questions"
        },
        dash: {
            live: "🟢 LIVE", farmer: "Farmer! 👋",
            temp: "Temp\n°C", humid: "Humid\n%", rain: "Rain\nChance",
            wxTitle: "🌤️ Weather", farmTitle: "📊 Farm Overview", cropTitle: "🌾 Top Crops", advTitle: "Today's Advisory",
            rRisk: "Risk Level", rRiskSub: "Good Status", rProf: "Est. Profit", rProfSub: "Per Acre",
            rPest: "Pest Alert", rPestSub: "Safe", rWater: "Water Need", rWaterSub: "This Week",
        },
        soil: {
            title: "🪨 Soil Analysis", subtitle: "Enter your soil details below",
            params: "🧪 Soil Parameters", ph: "🌡️ pH", n: "🌿 Nitrogen (N) kg/ha", p: "⚗️ Phosphorus (P) kg/ha", k: "🔬 Potassium (K) kg/ha",
            moist: "💧 Moisture %", type: "🪨 Soil Type",
            btn: "🔬 Analyze Soil", btnLoad: "Analyzing…",
            health: "Soil Health", insights: "💡 AI Insights", warn: "Warning", amend: "🌿 Amendments", crops: "🌾 Suitable Crops"
        },
        crops: {
            title: "🌱 Crops", subtitle: "AI Portfolio · Browse all crops",
            tabAI: "🤖 AI Portfolio", tabAll: "🌾 All Crops",
            farmDet: "🚜 Farm Details", land: "🌾 Land (acres)", budget: "💵 Budget (₹)",
            btn: "🤖 Generate Strategy", btnLoad: "Generating…",
            port: "📋 PORTFOLIO STRATEGY", inv: "Investment", prof: "Expected Profit",
            yield: "Yield", roi: "ROI", cost: "Cost", risk: "Risk", tips: "💡 Expert Tips",
            search: "Search crops...", all: "All", found: "crops", no: "No crops found", noSub: "Try another search term",
            water: "💧 Water", soil: "🪨 Soil", npk: "⚗️ NPK", cyield: "📦 Yield", dur: "📅 Duration", cprice: "💰 Price",
            dis: "⚠️ Common Diseases", cprof: "📈 Profitability:"
        },
        scan: {
            title: "📷 Plant Scan", subtitle: "Take a photo to detect disease",
            upTitle: "Upload Plant Photo", upSub: "Leaf · Stem · Fruit",
            btn: "🔬 Diagnose", btnLoad: "Scanning…", btnChg: "📷 Change Photo",
            id: "🌿 Plant ID", detect: "Detected", cond: "Confidence", sev: "Severity",
            cause: "Cause", symp: "🔍 Symptoms", fert: "🧪 Fertilizers", treat: "💊 Treatment Steps",
            recov: "Recovery Time", prev: "Prevention",
            homeRem: "🍃 Homemade Remedy", chemSol: "🧪 Chemical Solution", shop: "🏪 Nearby Shops"
        },
        market: {
            title: "📊 Market Price", subtitle: "Mandi rates & AI Forecast",
            cropSel: "🌾 Select Crop", crop: "🌱 Crop Name",
            btn: "📈 Get Price", btnLoad: "Getting price…",
            d30: "30-Day\nForecast", d60: "60-Day\nForecast", msp: "Above\nMSP",
            mandis: "🏪 Nearby Mandis", adv: "💡 AI Advice", fac: "📰 Price Factors",
            vol: "volatility"
        },
        wx: {
            na: "⚠️ Weather not available", feels: "Feels", rainW: "⚠️ Rain today — avoid field work",
            heatW: "🌡️ Extreme heat — water your crops", today: "Today"
        }
    },
    hi: {
        label: "हिंदी", flag: "🇮🇳", bcp: "hi-IN", geminiLang: "Hindi",
        nav: { home: "होम", soil: "मिट्टी", crops: "फसलें", scan: "स्कैन", market: "बाज़ार", voice: "आवाज़", schemes: "योजनाएं" },
        common: { season: "मौसम", state: "राज्य", search: "खोजें..." },
        voice: {
            title: "🎙️ आवाज़ और चैट",
            greeting: ["सुप्रभात 🌅", "शुभ दोपहर ☀️", "शुभ संध्या 🌙"],
            farmAssistant: "AI किसान सहायक",
            tapSpeak: "बोलने के लिए टैप करें", listening: "सुन रहा हूँ...", typeHere: "यहाँ लिखें...",
            quickQ: ["मेरी मिट्टी के लिए कौनसी फसल?", "पत्ते पीले क्यों हो रहे हैं?", "धान के लिए खाद कौनसी?", "आज चावल का भाव?", "सिंचाई कब करें?", "कीटनाशक कैसे लगाएं?"],
            welcome: "नमस्ते! 🙏 मैं आपका AgriSense सहायक हूँ। फसल, मिट्टी, बीमारी, भाव के बारे में पूछें!",
            voiceNotSupported: "आपके ब्राउज़र में आवाज़ काम नहीं करती। टाइप करें।",
            voiceError: "आवाज़ नहीं सुनी। फिर से कोशिश करें।",
            changeLang: "भाषा बदलें", start: "शुरू हो रहा है...", tapStop: "रोकने के लिए फिर दबाएं", hint: "बोलें या लिखें",
            quickTitle: "⚡ त्वरित प्रश्न"
        },
        dash: {
            live: "🟢 लाइव | LIVE", farmer: "किसान! 👋",
            temp: "तापमान\nTemp", humid: "नमी\nHumid", rain: "बारिश\nRain",
            wxTitle: "🌤️ मौसम | Weather", farmTitle: "📊 खेत अवलोकन | Farm Overview", cropTitle: "🌾 शीर्ष फसलें | Top Crops", advTitle: "आज की सलाह | Advisory",
            rRisk: "जोखिम स्तर", rRiskSub: "अच्छा स्तर", rProf: "अनुमानित लाभ", rProfSub: "प्रति एकड़",
            rPest: "कीट चेतावनी", rPestSub: "सुरक्षित", rWater: "पानी", rWaterSub: "इस सप्ताह",
        },
        soil: {
            title: "🪨 मिट्टी परीक्षण | Soil Analysis", subtitle: "अपनी मिट्टी का विवरण दर्ज करें",
            params: "🧪 मिट्टी के पैरामीटर", ph: "🌡️ पी.एच (pH)", n: "🌿 नाइट्रोजन (N)", p: "⚗️ फास्फोरस (P)", k: "🔬 पोटेशियम (K)",
            moist: "💧 नमी %", type: "🪨 मिट्टी का प्रकार",
            btn: "🔬 मिट्टी परीक्षण", btnLoad: "परीक्षण हो रहा है…",
            health: "मिट्टी का स्वास्थ्य", insights: "💡 AI सुझाव", warn: "चेतावनी", amend: "🌿 आवश्यक सुधार", crops: "🌾 उपयुक्त फसलें"
        },
        crops: {
            title: "🌱 फसलें | Crops", subtitle: "AI पोर्टफोलियो · सभी फसलें",
            tabAI: "🤖 AI योजना", tabAll: "🌾 सभी फसलें",
            farmDet: "🚜 खेत विवरण", land: "🌾 भूमि (एकड़)", budget: "💵 बजट (₹)",
            btn: "🤖 AI योजना बनाएं", btnLoad: "योजना बन रही है…",
            port: "📋 पोर्टफोलियो रणनीति", inv: "निवेश", prof: "अनुमानित लाभ",
            yield: "उपज", roi: "मुनाफ़ा", cost: "लागत", risk: "जोखिम", tips: "💡 विशेषज्ञ सलाह",
            search: "फसलें खोजें...", all: "सभी", found: "फसलें", no: "फसल नहीं मिली", noSub: "कोई दूसरा शब्द आज़माएं",
            water: "💧 पानी", soil: "🪨 मिट्टी", npk: "⚗️ NPK", cyield: "📦 उपज", dur: "📅 अवधि", cprice: "💰 मूल्य",
            dis: "⚠️ सामान्य रोग", cprof: "📈 लाभप्रदता:"
        },
        scan: {
            title: "📷 पौधा स्कैन | Plant Scan", subtitle: "बीमारी का पता लगाने के लिए फोटो लें",
            upTitle: "पौधे का फोटो लें\nUpload Photo", upSub: "पत्ता · तना · फल",
            btn: "🔬 रोग पहचानें", btnLoad: "परीक्षण हो रहा है…", btnChg: "📷 फोटो बदलें",
            id: "🌿 पौधे की पहचान", detect: "पहचान गया | Detected", cond: "विश्वास", sev: "गंभीरता",
            cause: "कारण", symp: "🔍 लक्षण | Symptoms", fert: "🧪 उर्वरक", treat: "💊 इलाज | Treatment",
            recov: "ठीक होने का समय\nRecovery Time", prev: "रोकथाम\nPrevention",
            homeRem: "🍃 घरेलू उपाय | Home Remedy", chemSol: "🧪 रासायनिक समाधान | Chemical Sol", shop: "🏪 पास की दुकानें | Nearby Shops"
        },
        market: {
            title: "📊 बाज़ार भाव | Market Price", subtitle: "मंडी दरें · AI भविष्यवाणी",
            cropSel: "🌾 फसल चुनें", crop: "🌱 फसल",
            btn: "📈 भाव प्राप्त करें", btnLoad: "भाव मिल रहा है…",
            d30: "30-दिन\n30-Day", d60: "60-दिन\n60-Day", msp: "MSP ऊपर\nAbove MSP",
            mandis: "🏪 पास की मंडियां | Mandis", adv: "💡 AI सलाह", fac: "📰 मूल्य कारक",
            vol: "अस्थिरता"
        },
        wx: {
            na: "⚠️ मौसम उपलब्ध नहीं", feels: "महसूस", rainW: "⚠️ आज बारिश — खेत का काम टालें",
            heatW: "🌡️ अत्यधिक गर्मी — फसलों को पानी दें", today: "आज"
        }
    },
    te: {
        label: "తెలుగు", flag: "🇮🇳", bcp: "te-IN", geminiLang: "Telugu",
        nav: { home: "హోమ్", soil: "మట్టి", crops: "పంట", scan: "స్కాన్", market: "మార్కెట్", voice: "వాయిస్", schemes: "పథకాలు" },
        common: { season: "సీజన్", state: "రాష్ట్రం", search: "వెతకండి..." },
        voice: {
            title: "🎙️ వాయిస్ & చాట్",
            greeting: ["శుభోదయం 🌅", "శుభ మధ్యాహ్నం ☀️", "శుభ సాయంత్రం 🌙"],
            farmAssistant: "AI వ్యవసాయ సహాయకుడు",
            tapSpeak: "మాట్లాడటానికి నొక్కండి", listening: "వింటున్నాను...", typeHere: "ఇక్కడ టైప్ చేయండి...",
            quickQ: ["నా మట్టికి ఏ పంట?", "ఆకులు పసుపు ఎందుకు?", "వరికి ఎరువు ఏది?", "ఈరోజు వరి ధర?", "నీరు ఎప్పుడు పెట్టాలి?", "పురుగులను ఎలా నివారించాలి?"],
            welcome: "నమస్కారం! 🙏 నేను మీ AgriSense సహాయకుడిని. పంట, మట్టి, వ్యాధి, ధర గురించి అడగండి!",
            voiceNotSupported: "మీ బ్రౌజర్‌లో వాయిస్ పని చేయదు. టైప్ చేయండి.",
            voiceError: "వాయిస్ వినలేదు. మళ్ళీ ప్రయత్నించండి.",
            changeLang: "భాష మార్చు", start: "ప్రారంభమవుతోంది...", tapStop: "ఆపడానికి మళ్ళీ నొక్కండి", hint: "మాట్లాడండి లేదా టైప్ చేయండి",
            quickTitle: "⚡ శీఘ్ర ప్రశ్నలు"
        },
        dash: {
            live: "🟢 ప్రత్యక్ష | LIVE", farmer: "రైతు! 👋",
            temp: "ఉష్ణోగ్రత\nTemp", humid: "తేమ\nHumid", rain: "వర్షం\nRain",
            wxTitle: "🌤️ వాతావరణం | Weather", farmTitle: "📊 వ్యవసాయ పరిస్థితి", cropTitle: "🌾 అగ్ర పంటలు", advTitle: "నేటి సలహా",
            rRisk: "ప్రమాద స్థాయి", rRiskSub: "సురక్షితం", rProf: "అంచనా లాభం", rProfSub: "ఎకరాకు",
            rPest: "తెగులు హెచ్చరిక", rPestSub: "సురక్షితం", rWater: "నీటి అవసరం", rWaterSub: "ఈ వారం",
        },
        soil: {
            title: "🪨 మట్టి పరీక్ష | Soil Analysis", subtitle: "మట్టి వివరాలు నమోదు చేయండి",
            params: "🧪 మట్టి పారామితులు", ph: "🌡️ pH", n: "🌿 నత్రజని (N)", p: "⚗️ భాస్వరం (P)", k: "🔬 పొటాషియం (K)",
            moist: "💧 తేమ %", type: "🪨 మట్టి రకం",
            btn: "🔬 విశ్లేషించు", btnLoad: "విశ్లేషిస్తోంది...",
            health: "మట్టి ఆరోగ్యం", insights: "💡 AI అంతర్దృష్టులు", warn: "హెచ్చరిక", amend: "🌿 సిఫార్సులు", crops: "🌾 తగిన పంటలు"
        },
        crops: {
            title: "🌱 పంటలు | Crops", subtitle: "AI పోర్ట్‌ఫోలియో · అన్ని పంటలు",
            tabAI: "🤖 AI ప్రణాళిక", tabAll: "🌾 అన్ని పంటలు",
            farmDet: "🚜 పొలం వివరాలు", land: "🌾 భూమి (ఎకరాలు)", budget: "💵 బడ్జెట్ (₹)",
            btn: "🤖 ప్రణాళిక రూపొందించు", btnLoad: "రూపొందిస్తోంది...",
            port: "📋 పోర్ట్‌ఫోలియో వ్యూహం", inv: "పెట్టుబడి", prof: "అంచనా లాభం",
            yield: "దిగుబడి", roi: "ఆదాయం", cost: "ఖర్చు", risk: "ప్రమాదం", tips: "💡 నిపుణుల సలహాలు",
            search: "పంటలను వెతకండి...", all: "అన్నీ", found: "పంటలు", no: "పంట దొరకలేదు", noSub: "మరొక పదం ప్రయత్నించండి",
            water: "💧 నీరు", soil: "🪨 మట్టి", npk: "⚗️ NPK", cyield: "📦 దిగుబడి", dur: "📅 కాలం", cprice: "💰 ధర",
            dis: "⚠️ సాధారణ వ్యాధులు", cprof: "📈 లాభం:"
        },
        scan: {
            title: "📷 మొక్క స్కాన్ | Plant Scan", subtitle: "వ్యాధిని గుర్తించడానికి ఫోటో తీయండి",
            upTitle: "ఫోటో తీయండి\nUpload Photo", upSub: "ఆకు · కాండం · పండు",
            btn: "🔬 నిర్ధారించు", btnLoad: "స్కాన్ చేస్తోంది...", btnChg: "📷 ఫోటో మార్చు",
            id: "🌿 మొక్క గుర్తింపు", detect: "గుర్తించబడింది | Detected", cond: "నమ్మకం", sev: "తీవ్రత",
            cause: "కారణం", symp: "🔍 లక్షణాలు | Symptoms", fert: "🧪 ఎరువులు", treat: "💊 చికిత్స | Treatment",
            recov: "కోలుకునే సమయం\nRecovery Time", prev: "నివారణ\nPrevention",
            homeRem: "🍃 ఇంటి నివారణ పద్ధతులు | Home Remedy", chemSol: "🧪 రసాయన పరిష్కారం | Chemical Sol", shop: "🏪 సమీప దుకాణాలు | Nearby Shops"
        },
        market: {
            title: "📊 మార్కెట్ ధర | Market Price", subtitle: "మండి ధరలు · AI అంచనా",
            cropSel: "🌾 పంట ఎంచుకోండి", crop: "🌱 పంట",
            btn: "📈 ధరను పొందండి", btnLoad: "పొందుతోంది...",
            d30: "30-రోజులు\n30-Day", d60: "60-రోజులు\n60-Day", msp: "MSP పైన\nAbove MSP",
            mandis: "🏪 సమీప మండీలు | Mandis", adv: "💡 AI సలహా", fac: "📰 ధరల కారకాలు",
            vol: "అస్థిరత"
        },
        wx: {
            na: "⚠️ వాతావరణం అందుబాటులో లేదు", feels: "అనిపిస్తుంది", rainW: "⚠️ నేడు వర్షం - పని వాయిదా వేయండి",
            heatW: "🌡️ తీవ్ర తల వేడి - పంటలకు నీరు పెట్టండి", today: "నేడు"
        }
    },
    kn: {
        label: "ಕನ್ನಡ", flag: "🇮🇳", bcp: "kn-IN", geminiLang: "Kannada",
        nav: { home: "ಮುಖಪುಟ", soil: "ಮಣ್ಣು", crops: "ಬೆಳೆ", scan: "ಸ್ಕ್ಯಾನ್", market: "ಮಾರುಕಟ್ಟೆ", voice: "ಧ್ವನಿ", schemes: "ಯೋಜನೆಗಳು" },
        common: { season: "ಋತು", state: "ರಾಜ್ಯ", search: "ಹುಡುಕಿ..." },
        voice: {
            title: "🎙️ ಧ್ವನಿ ಚಾಟ್",
            greeting: ["ಶುಭೋದಯ 🌅", "ಶುಭ ಮಧ್ಯಾಹ್ನ ☀️", "ಶುಭ ಸಂಜೆ 🌙"],
            farmAssistant: "AI ಸಹಾಯಕ",
            tapSpeak: "ಮಾತನಾಡಲು ಒತ್ತಿ", listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ...", typeHere: "ಟೈಪ್ ಮಾಡಿ...",
            quickQ: ["ನನ್ನ ಮಣ್ಣಿಗೆ ಯಾವ ಬೆಳೆ?", "ಎಲೆಗಳು ಹಳದಿ ಯಾಕೆ?", "ಭತ್ತಕ್ಕೆ ಗೊಬ್ಬರ?", "ಭತ್ತದ ಬೆಲೆ?", "ನೀರು ಯಾವಾಗ?", "ಕೀಟ ನಿಯಂತ್ರಣ?"],
            welcome: "ನಮಸ್ಕಾರ! 🙏 ನಾನು ನಿಮ್ಮ ಅಗ್ರಿಸೆನ್ಸ್ ಸಹಾಯಕ.",
            voiceNotSupported: "ಧ್ವನಿ ಕೆಲಸ ಮಾಡುವುದಿಲ್ಲ.",
            voiceError: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
            changeLang: "ಭಾಷೆ ಬದಲಿಸಿ", start: "ಪ್ರಾರಂಭಿಸುತ್ತಿದೆ...", tapStop: "ನಿಲ್ಲಿಸಲು ಮತ್ತೆ ಒತ್ತಿ", hint: "ಮಾತನಾಡಿ / ಟೈಪ್ ಮಾಡಿ",
            quickTitle: "⚡ ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು"
        },
        dash: {
            live: "🟢 ಲೈವ್ | LIVE", farmer: "ರೈತ! 👋",
            temp: "ತಾಪಮಾನ\nTemp", humid: "ತೇವಾಂಶ\nHumid", rain: "ಮಳೆ\nRain",
            wxTitle: "🌤️ ಹವಾಮಾನ | Weather", farmTitle: "📊 ಕೃಷಿ ಸ್ಥಿತಿ", cropTitle: "🌾 ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳು", advTitle: "ಇಂದಿನ ಸಲಹೆ",
            rRisk: "ಅಪಾಯ ಮಟ್ಟ", rRiskSub: "ಸುರಕ್ಷಿತ", rProf: "ಅಂದಾಜು ಲಾಭ", rProfSub: "ಎಕರೆಗೆ",
            rPest: "ಕೀಟ ಎಚ್ಚರಿಕೆ", rPestSub: "ಸುರಕ್ಷಿತ", rWater: "ನೀರಿನ ಅಗತ್ಯ", rWaterSub: "ಈ ವಾರ",
        },
        soil: {
            title: "🪨 ಮಣ್ಣು ಪರೀಕ್ಷೆ | Soil", subtitle: "ಮಣ್ಣಿನ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
            params: "🧪 ಮಣ್ಣಿನ ನಿಯತಾಂಕಗಳು", ph: "🌡️ pH", n: "🌿 ಸಾರಜನಕ (N)", p: "⚗️ ರಂಜಕ (P)", k: "🔬 ಪೊಟ್ಯಾಸಿಯಮ್ (K)",
            moist: "💧 ತೇವಾಂಶ %", type: "🪨 ಮಣ್ಣಿನ ಪ್ರಕಾರ",
            btn: "🔬 ವಿಶ್ಲೇಷಿಸಿ", btnLoad: "ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
            health: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ", insights: "💡 AI ಒಳನೋಟಗಳು", warn: "ಎಚ್ಚರಿಕೆ", amend: "🌿 ತಿದ್ದುಪಡಿಗಳು", crops: "🌾 ಸೂಕ್ತ ಬೆಳೆಗಳು"
        },
        crops: {
            title: "🌱 ಬೆಳೆಗಳು | Crops", subtitle: "AI ಪೋರ್ಟ್‌ಫೋಲಿಯೋ",
            tabAI: "🤖 AI ಯೋಜನೆ", tabAll: "🌾 ಎಲ್ಲಾ ಬೆಳೆಗಳು",
            farmDet: "🚜 ಕೃಷಿ ವಿವರಗಳು", land: "🌾 ಭೂಮಿ (ಎಕರೆ)", budget: "💵 ಬಜೆಟ್ (₹)",
            btn: "🤖 ಯೋಜನೆ ರಚಿಸಿ", btnLoad: "ರಚಿಸುತ್ತಿದೆ...",
            port: "📋 ಪೋರ್ಟ್‌ಫೋಲಿಯೋ", inv: "ಹೂಡಿಕೆ", prof: "ನಿರೀಕ್ಷಿತ ಲಾಭ",
            yield: "ಇಳುವರಿ", roi: "ROI", cost: "ವೆಚ್ಚ", risk: "ಅಪಾಯ", tips: "💡 ಸಲಹೆಗಳು",
            search: "ಬೆಳೆ ಹುಡುಕಿ...", all: "ಎಲ್ಲಾ", found: "ಬೆಳೆಗಳು", no: "ಬೆಳೆ ಇಲ್ಲ", noSub: "ಬೇರೊಂದು ಪದ ಪ್ರಯತ್ನಿಸಿ",
            water: "💧 ನೀರು", soil: "🪨 ಮಣ್ಣು", npk: "⚗️ NPK", cyield: "📦 ಇಳುವರಿ", dur: "📅 ಅವಧಿ", cprice: "💰 ಬೆಲೆ",
            dis: "⚠️ ರೋಗಗಳು", cprof: "📈 ಲಾಭ:"
        },
        scan: {
            title: "📷 ಸಸ್ಯ ಸ್ಕ್ಯಾನ್ | Scan", subtitle: "ರೋಗ ಪತ್ತೆಹಚ್ಚಲು ಫೋಟೋ",
            upTitle: "ಫೋಟೋ\nUpload", upSub: "ಎಲೆ · ಕಾಂಡ ",
            btn: "🔬 ರೋಗ ಪತ್ತೆ", btnLoad: "ಪತ್ತೆಹಚ್ಚುತ್ತಿದೆ...", btnChg: "📷 ಫೋಟೋ ಬದಲಾಯಿಸಿ",
            id: "🌿 ಸಸ್ಯ ಗುರುತಿಸುವಿಕೆ", detect: "ಪತ್ತೆಯಾಗಿದೆ | Detected", cond: "ನಂಬಿಕೆ", sev: "ತೀವ್ರತೆ",
            cause: "ಕಾರಣ", symp: "🔍 ಲಕ್ಷಣಗಳು | Symptoms", fert: "🧪 ರಸಗೊಬ್ಬರ", treat: "💊 ಚಿಕಿತ್ಸೆ | Treatment",
            recov: "ಚೇತರಿಕೆ\nRecovery Time", prev: "ತಡೆಗಟ್ಟುವಿಕೆ\nPrevention",
            homeRem: "🍃 ಮನೆಮದ್ದು | Home Remedy", chemSol: "🧪 ರಾಸಾಯನಿಕ ಪರಿಹಾರ | Chemical Sol", shop: "🏪 ಹತ್ತಿರದ ಅಂಗಡಿಗಳು | Nearby Shops"
        },
        बाजार: {
            title: "📊 ಮಾರುಕಟ್ಟೆ | Market", subtitle: "ಮಂಡಿ ದರಗಳು",
            cropSel: "🌾 ಬೆಳೆ ಆಯ್ಕೆ", crop: "🌱 ಬೆಳೆ",
            btn: "📈 ಬೆಲೆ ಪಡೆಯಿರಿ", btnLoad: "ಪಡೆಯುತ್ತಿದೆ...",
            d30: "30-ದಿನ\n30-Day", d60: "60-ದಿನ\n60-Day", msp: "MSP ಗಿಂತ\nAbove MSP",
            mandis: "🏪 ಮಂಡಿಗಳು | Mandis", adv: "💡 AI ಸಲಹೆ", fac: "📰 ಬೆಲೆ ಅಂಶಗಳು",
            vol: "ಅಸ್ಥಿರತೆ"
        },
        wx: {
            na: "⚠️ ಹವಾಮಾನ ಲಭ್ಯವಿಲ್ಲ", feels: "ಅನಿಸುತ್ತದೆ", rainW: "⚠️ ಇಂದು ಮಳೆ - ಕೆಲಸ ಮುಂದೂಡಿ",
            heatW: "🌡️ ವಿಪರೀತ ಶಾಖ ", today: "ಇಂದು"
        }
    },
    ml: {
        label: "മലയാളം", flag: "🇮🇳", bcp: "ml-IN", geminiLang: "Malayalam",
        nav: { home: "ഹോം", soil: "മണ്ണ്", crops: "വിള", scan: "സ്കാൻ", market: "മാർക്കറ്റ്", voice: "ശബ്ദം", schemes: "പദ്ധതികൾ" },
        common: { season: "കാലം", state: "സംസ്ഥാനം", search: "തിരയുക..." },
        voice: {
            title: "🎙️ ശബ്ദവും ചാറ്റും",
            greeting: ["സുപ്രഭാതം 🌅", "ഉച്ചയ്ക്ക് ☀️", "സന്ധ്യ 🌙"],
            farmAssistant: "AI കൃഷി സഹായി",
            tapSpeak: "സംസാരിക്കുക", listening: "കേൾക്കുന്നു...", typeHere: "ടൈപ്പ് ചെയ്യുക...",
            quickQ: ["ഏത് വിള?", "ഇലകൾ മഞ്ഞ?", "ഏത് വളം?", "നെല്ലിന്റെ വില?", "ജലസേചനം?", "കീടനിയന്ത്രണം?"],
            welcome: "നമസ്കാരം! 🙏 ഞാൻ നിങ്ങളുടെ AgriSense സഹായി. ചോദിക്കൂ!",
            voiceNotSupported: "വോയ്സ് പ്രവർത്തിക്കുന്നില്ല.",
            voiceError: "വീണ്ടും ശ്രമിക്കൂ.",
            changeLang: "ഭാഷ മാറ്റുക", start: "തുടങ്ങുന്നു...", tapStop: "നിർത്താൻ അമർത്തുക", hint: "സംസാരിക്കുക / ടൈപ്പ് ചെയ്യുക",
            quickTitle: "⚡ അതിവേഗ ചോദ്യങ്ങൾ"
        },
        dash: {
            live: "🟢 ലൈവ് | LIVE", farmer: "കർഷകൻ! 👋",
            temp: "താപനില\nTemp", humid: "ഈർപ്പം\nHumid", rain: "മഴ\nRain",
            wxTitle: "🌤️ കാലാവസ്ഥ | Weather", farmTitle: "📊 കൃഷി നിലവാരം", cropTitle: "🌾 മികച്ച വിളകൾ", advTitle: "ഇന്നത്തെ ഉപദേശം",
            rRisk: "അപകടസാധ്യത", rRiskSub: "സുരക്ഷിതം", rProf: "ലാഭം", rProfSub: "ഏക്കറിന്",
            rPest: "കീട ജാഗ്രത", rPestSub: "സുരക്ഷിതം", rWater: "ജല ആവശ്യകത", rWaterSub: "ഈ ആഴ്ച",
        },
        soil: {
            title: "🪨 മണ്ണ് പരിശോധന | Soil", subtitle: "മണ്ണിന്റെ വിവരങ്ങൾ നൽകുക",
            params: "🧪 മണ്ണിന്റെ അളവുകൾ", ph: "🌡️ pH", n: "🌿 നൈട്രജൻ (N)", p: "⚗️ ഫോസ്ഫറസ് (P)", k: "🔬 പൊട്ടാസ്യം (K)",
            moist: "💧 ഈർപ്പം %", type: "🪨 മണ്ണിനം",
            btn: "🔬 പരിശോധിക്കുക", btnLoad: "പരിശോധിക്കുന്നു...",
            health: "മണ്ണിന്റെ ആരോഗ്യം", insights: "💡 AI ഉപദേശങ്ങൾ", warn: "മുന്നറിയിപ്പ്", amend: "🌿 ചേർക്കേണ്ടവ", crops: "🌾 അനുയോജ്യമായ വിളകൾ"
        },
        crops: {
            title: "🌱 വിളകൾ | Crops", subtitle: "AI പോർട്ട്ഫോളിയോ",
            tabAI: "🤖 AI പ്ലാൻ", tabAll: "🌾 എല്ലാ വിളകളും",
            farmDet: "🚜 കൃഷി വിവരങ്ങൾ", land: "🌾 ഭൂಮಿ (ഏക്കർ)", budget: "💵 ബജറ്റ് (₹)",
            btn: "🤖 പ്ലാൻ ഉണ്ടാക്കുക", btnLoad: "ഉണ്ടാക്കുന്നു...",
            port: "📋 പോർട്ട്ഫോളിയോ", inv: "നിക്ഷേപം", prof: "പ്രതീക്ഷിക്കുന്ന ലാഭം",
            yield: "വിളവ്", roi: "വരുമാനം", cost: "ചെലവ്", risk: "റിസ്ക്", tips: "💡 ഉപദേശങ്ങൾ",
            search: "വിളകൾ തിരയുക...", all: "എല്ലാം", found: "വിളകൾ", no: "വിള കണ്ടെത്തിയില്ല", noSub: "മറ്റൊരു വാക്ക് ശ്രമിക്കുക",
            water: "💧 വെള്ളം", soil: "🪨 മണ്ണ്", npk: "⚗️ NPK", cyield: "📦 വിളവ്", dur: "📅 കാലാവധി", cprice: "💰 വില",
            dis: "⚠️ രോഗങ്ങൾ", cprof: "📈 ലാഭം:"
        },
        scan: {
            title: "📷 ചെടി സ്കാൻ | Scan", subtitle: "രോഗം കണ്ടുപിടിക്കാൻ ഫോട്ടോ",
            upTitle: "ഫോട്ടോ എടുക്കുക\nUpload", upSub: "ഇല · തണ്ട് ",
            btn: "🔬 രോഗം കണ്ടെത്തുക", btnLoad: "പരിശോധിക്കുന്നു...", btnChg: "📷 ഫോട്ടോ മാറ്റുക",
            id: "🌿 ചെടി തിരിച്ചറിയൽ", detect: "കണ്ടെത്തി | Detected", cond: "വിശ്വാസം", sev: "തീവ്രത",
            cause: "കാരണം", symp: "🔍 ലക്ഷണങ്ങൾ | Symptoms", fert: "🧪 വളങ്ങൾ", treat: "💊 ചികിത്സ | Treatment",
            recov: "ഭേദമാകാൻ\nRecovery Time", prev: "പ്രതിരോധം\nPrevention",
            homeRem: "🍃 വീട്ടു വൈദ്യം | Home Remedy", chemSol: "🧪 രാസപരിഹാരം | Chemical Sol", shop: "🏪 അടുത്തുള്ള കടകൾ | Nearby Shops"
        },
        market: {
            title: "📊 വിപണി വില | Market Price", subtitle: "മണ്ടി നിരക്കുകൾ",
            cropSel: "🌾 വിള തിരഞ്ഞെടുക്കുക", crop: "🌱 വിള",
            btn: "📈 വില അറിയുക", btnLoad: "വില എടുക്കുന്നു...",
            d30: "30-ദിവസം\n30-Day", d60: "60-ദിവസം\n60-Day", msp: "MSP മുകളിൽ\nAbove MSP",
            mandis: "🏪 അടുത്തുള്ള മണ്ടികൾ | Mandis", adv: "💡 AI ഉപദേശം", fac: "📰 വില കാരണങ്ങൾ",
            vol: "അസ്ഥിരത"
        },
        wx: {
            na: "⚠️ കാലാവസ്ഥ ലഭ്യമല്ല", feels: "അനുഭവപ്പെടുന്നു", rainW: "⚠️ മഴ സാധ്യത - പാടത്തെ പണി ഒഴിവാക്കുക",
            heatW: "🌡️ കടുത്ത ചൂട് - വെള്ളം നൽകുക", today: "ഇന്ന്"
        }
    }
};

export const LANG_ORDER = ["ta", "hi", "te", "kn", "ml", "en"];
