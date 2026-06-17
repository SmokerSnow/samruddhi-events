'use strict';

(() => {
  const STORAGE_KEY = 'samruddhi-menu-builder-state-v3';
  const LEGACY_STORAGE_KEYS = ['samruddhi-menu-builder-state-v2'];
  const NEW_CATEGORY_VALUE = '__new__';
  const CUSTOM_TAB_PREFIX = 'custom_';
  const CREDIT_TEXT = 'Developed by Nayan Parihar';
  const APP_ID = 'samruddhi-menu-builder';
  const HISTORY_LIMIT = 60;
  const SYNC_POLL_MS = 5000;
  const SYNC_DB_NAME = 'samruddhi-menu-builder-sync';
  const SYNC_DB_STORE = 'handles';
  const SYNC_HANDLE_KEY = 'main-sync-file';
  const SYNC_FILE_NAME = 'samruddhi-menu-sync.json';
  const CLOUD_SYNC_URL_KEY = 'samruddhi-menu-builder-cloud-sync-url';
  const CLOUD_SYNC_QUERY_PARAM = 'sync';
  const CLOUD_POLL_MS = 5000;
  const DOCUMENT_LOGO_SRC = 'assets/img/samruddhi-caterers.png';
  const DEFAULT_DB = window.SAMRUDDHI_DEFAULT_MENU_DB || {};
  const QUOTATION_TERMS_HI = [
    'कार्यक्रम बुकिंग समय पर 25% एवं कार्यक्रम के 30 दिन पूर्व 60% रकम अग्रिम जमा करना अनिवार्य है।',
    'बकाया राशि का भुगतान कार्यक्रम समाप्ति के बाद करना अनिवार्य है।',
    'किसी कारणवश अगर आपका कार्यक्रम स्थगित या निरस्त होता है तो उस स्थिति में 10% राशि काट कर राशि का भुगतान निश्चित तिथि पर किया जावेगा या आपके अन्य किसी कार्यक्रम में उस राशि को समायोजित कर दिया जायेगा।',
    'भोजन शुरू होने के 10 मिनट पहले ग्राहक की तरफ से एक व्यक्ति प्लेट एवं भोजन का मेनू चेक करने के लिए उपस्थित रहें।',
    'सभी प्रसंगों में न्यायिक क्षेत्र देवास रहेगा।'
  ];

  const I18N = {
    en: {
      brandTagline: "Event's Organizer & Caterers",
      creditText: 'Developed by Nayan Parihar',
      switchToHindi: 'हिन्दी',
      switchToEnglish: 'English',
      clear: 'Clear',
      estimate: 'Estimate',
      menu: 'Menu',
      download: 'Download',
      eventDetails: 'Event Details',
      functionProfile: 'Function profile',
      autosaved: 'Autosaved',
      saving: 'Saving',
      notSaved: 'Not saved',
      functionGuest: 'Function / Guest',
      venue: 'Venue',
      date: 'Date',
      contact: 'Contact',
      guestPlaceholder: 'Sharma Ji Ki Shaadi',
      venuePlaceholder: 'Hall or venue name',
      contactPlaceholder: 'Mobile number',
      history: 'History',
      savedRecords: 'Saved records',
      saveHistory: 'Save History',
      showHistory: 'Show History',
      hideHistory: 'Hide History',
      printHistory: 'Print History',
      syncStorage: 'Device Sync',
      multiDeviceSync: 'Google Drive auto sync',
      localStorageReady: 'Not paired. Data is saved on this device.',
      connectSyncFile: 'Pair Device',
      connectDevicesTitle: 'Pair device',
      deviceAddress: 'Google sync link',
      deviceLinkPlaceholder: 'Paste Google Apps Script web app URL',
      pairDevice: 'Pair Device',
      copyLink: 'Copy Link',
      done: 'Done',
      loadSync: 'Load Sync',
      saveSync: 'Save Sync',
      exportBackup: 'Export Backup',
      importBackup: 'Import Backup',
      addHeading: 'Add Heading',
      currentHeading: 'Current Heading',
      time: 'Time',
      members: 'Members',
      pricePlate: 'Price / Plate',
      remark: 'Remark',
      saveRemark: 'Save / Update Remark',
      deleteRemark: 'Delete Remark',
      remarkPlaceholder: 'Special note for this function',
      delete: 'Delete',
      deleteCustomHeading: 'Delete custom heading',
      selectedItems: 'Selected Items',
      estimateTotal: 'Estimate Total',
      activeHeading: 'Active Heading',
      catalogSize: 'Catalog Size',
      catalog: 'Catalog',
      menuItems: 'Menu items',
      searchMenuItems: 'Search menu items',
      searchPlaceholder: 'Search items or categories',
      addCategory: 'Add Category',
      addItem: 'Add Item',
      itemName: 'Item name',
      itemPlaceholder: 'e.g. Paneer Tikka',
      hindiItemName: 'Hindi name',
      hindiItemPlaceholder: 'e.g. पनीर टिक्का',
      category: 'Category',
      bulkItems: 'Bulk items',
      bulkPlaceholder: 'One item per line, comma, or semicolon',
      bulkHindiItems: 'Bulk Hindi names',
      bulkHindiPlaceholder: 'Same order as bulk items',
      addSingleItem: 'Add Item',
      addBulkItems: 'Add Bulk Items',
      selection: 'Selection',
      generateMenu: 'Generate Menu',
      generateEstimate: 'Generate Estimate',
      downloadDocument: 'Download Document',
      print: 'Print',
      close: 'Close',
      transferCategory: 'Transfer Category',
      targetHeading: 'Target Heading',
      transferMode: 'Transfer Mode',
      copyCategory: 'Copy category',
      moveCategory: 'Move category',
      cancel: 'Cancel',
      transfer: 'Transfer',
      selectCategory: 'Select category',
      createNewCategory: 'Create new category',
      edit: 'Edit',
      rename: 'Rename',
      collapse: 'Collapse',
      expand: 'Expand',
      restore: 'Restore',
      item: 'item',
      items: 'items',
      categoryTerm: 'category',
      categoriesTerm: 'categories',
      person: 'Person',
      persons: 'Persons',
      total: 'Total',
      grandTotal: 'Grand Total',
      amount: 'Amount',
      ratePlate: 'Rate / Plate',
      functionMeal: 'Function / Meal',
      termsConditions: 'Terms & Conditions',
      selectedMenuItems: 'Selected menu items',
      estimateQuotation: 'Estimate / Quotation',
      clientSignature: 'Client Signature',
      catererSignature: 'Samruddhi Caterers',
      estimateNote: 'This is a computer-generated estimate. Prices are subject to final confirmation.',
      menuDocTitle: 'Menu',
      historyDocTitle: 'History',
      savedOn: 'Saved on',
      noHistory: 'No history saved yet',
      noHistoryHelp: 'Save a menu or estimate to keep it in history.',
      noCategories: 'No categories yet',
      noCategoriesHelp: 'Add a category or bulk items to begin.',
      noResults: 'No results found',
      noResultsHelp: 'Try a different item or category name.',
      noSelected: 'No selected items',
      noSelectedHelp: 'Choose items from the catalog.',
      noItems: 'No items yet',
      untitledEvent: 'Untitled event',
      headingAdded: 'Heading added.',
      headingDeleted: 'Heading deleted.',
      headingNamePrompt: 'New heading name:',
      headingIconPrompt: 'Small icon or short label:',
      categoryNamePrompt: 'Category name:',
      renameCategoryPrompt: 'Rename category:',
      renameItemPrompt: 'Rename item:',
      renameItemHindiPrompt: 'Hindi name:',
      categoryExists: 'This category already exists.',
      categoryAdded: 'Category added.',
      categoryRenamed: 'Category renamed.',
      categoryDeleted: 'Category deleted.',
      categoryTransferred: 'Category transferred.',
      targetHeadingMissing: 'Choose a target heading.',
      targetHeadingUnavailable: 'Add another heading before transferring a category.',
      itemExists: 'This item already exists in the selected category.',
      itemAdded: 'Item added and selected.',
      itemRenamed: 'Item renamed.',
      itemHindiSaved: 'Hindi item name saved.',
      itemDeleted: 'Item deleted.',
      remarkSaved: 'Remark saved.',
      remarkDeleted: 'Remark deleted.',
      noRemarkToDelete: 'No remark to delete.',
      bulkNeedsItems: 'Enter bulk items first.',
      bulkAdded: '{added} items added. {skipped} duplicates skipped.',
      enterItemName: 'Enter an item name.',
      chooseCategory: 'Choose a category.',
      noSelectedToClear: 'No selected items to clear.',
      selectionsCleared: 'Selections cleared.',
      selectBeforeMenu: 'Select at least one item before generating a menu.',
      estimateNeedsDetails: 'Add members and price per plate for at least one heading.',
      documentDownloaded: 'Document downloaded.',
      downloadNeedsData: 'Add menu items or estimate details before downloading.',
      generateFirst: 'Generate a menu or estimate first.',
      historyNeedsData: 'Add event details, menu items, or estimate details before saving history.',
      historySaved: 'History saved.',
      historyDeleted: 'History deleted.',
      historyRestored: 'History restored.',
      historyPrinted: 'History ready to print.',
      backupExported: 'Backup exported.',
      backupImported: 'Backup imported.',
      languageChanged: 'Language changed.',
      syncUnsupported: 'Auto sync needs Chrome or Edge. Data is still saved on this device.',
      syncOpenExistingQuestion: 'Select the shared sync file. If it does not exist yet, cancel once to create it.',
      syncReplaceConfirm: 'Replace current data with this sync data?',
      syncConnected: 'Auto sync connected',
      syncSaved: 'Auto synced',
      syncLoaded: 'Synced from another device',
      syncPermissionNeeded: 'Auto sync needs permission. Click Pair Device.',
      syncAutoReady: 'Auto sync connected',
      syncNeedsConnect: 'Click Pair Device first.',
      syncError: 'Sync failed. Try reconnecting the sync file.',
      hubOnline: 'Devices connected',
      hubOffline: 'Device hub is not running.',
      deviceLinkCopied: 'App sync link copied. Open it on your other devices.',
      cloudConnected: 'Google Drive sync connected',
      cloudSynced: 'Google Drive synced',
      cloudPairHelp: 'Paste the same Google sync link on every phone, tablet, and laptop.',
      cloudPairSaved: 'Device paired. Auto sync is on.',
      cloudPairError: 'Could not pair this device. Check the Google sync link.',
      importInvalid: 'This backup file is not valid.',
      deleteHeadingConfirm: 'Delete "{name}" and its selected items?',
      clearConfirm: 'Clear all selected menu items?',
      deleteItemConfirm: 'Permanently delete "{item}" from "{category}"?',
      deleteCategoryConfirm: 'Permanently delete "{category}" category?',
      deleteHistoryConfirm: 'Delete this saved history?',
      restoreHistoryConfirm: 'Restore this history into the current app?',
      catalogMeta: '{items} items in {categories} categories',
      catalogMetaSearch: '{items} matching items in {categories} categories',
      selectedCount: '{count} {label}',
      activeSummary: '{heading} · {count}',
      savedHistoryStats: '{items} items · {estimate}',
      syncStatusUpdated: '{status} · {time}'
    },
    hi: {
      brandTagline: 'इवेंट ऑर्गनाइज़र और कैटरर्स',
      creditText: 'Developed by Nayan Parihar',
      switchToHindi: 'हिन्दी',
      switchToEnglish: 'English',
      clear: 'साफ करें',
      estimate: 'अनुमान',
      menu: 'मेन्यू',
      download: 'डाउनलोड',
      eventDetails: 'कार्यक्रम विवरण',
      functionProfile: 'फंक्शन प्रोफाइल',
      autosaved: 'ऑटोसेव हुआ',
      saving: 'सेव हो रहा है',
      notSaved: 'सेव नहीं हुआ',
      functionGuest: 'फंक्शन / अतिथि',
      venue: 'स्थान',
      date: 'तारीख',
      contact: 'संपर्क',
      guestPlaceholder: 'शर्मा जी की शादी',
      venuePlaceholder: 'हॉल या स्थान का नाम',
      contactPlaceholder: 'मोबाइल नंबर',
      history: 'इतिहास',
      savedRecords: 'सेव रिकॉर्ड',
      saveHistory: 'इतिहास सेव करें',
      showHistory: 'इतिहास दिखाएं',
      hideHistory: 'इतिहास छुपाएं',
      printHistory: 'इतिहास प्रिंट करें',
      syncStorage: 'डिवाइस सिंक',
      multiDeviceSync: 'Google Drive ऑटो सिंक',
      localStorageReady: 'पेयर नहीं है। डेटा इस डिवाइस पर सेव है।',
      connectSyncFile: 'डिवाइस पेयर करें',
      connectDevicesTitle: 'डिवाइस पेयर करें',
      deviceAddress: 'Google सिंक लिंक',
      deviceLinkPlaceholder: 'Google Apps Script web app URL पेस्ट करें',
      pairDevice: 'डिवाइस पेयर करें',
      copyLink: 'लिंक कॉपी',
      done: 'हो गया',
      loadSync: 'सिंक लोड करें',
      saveSync: 'सिंक सेव करें',
      exportBackup: 'बैकअप एक्सपोर्ट',
      importBackup: 'बैकअप इंपोर्ट',
      addHeading: 'हेडिंग जोड़ें',
      currentHeading: 'वर्तमान हेडिंग',
      time: 'समय',
      members: 'सदस्य',
      pricePlate: 'प्रति प्लेट कीमत',
      remark: 'रिमार्क',
      saveRemark: 'रिमार्क सेव / अपडेट',
      deleteRemark: 'रिमार्क डिलीट',
      remarkPlaceholder: 'इस फंक्शन के लिए खास नोट',
      delete: 'डिलीट',
      deleteCustomHeading: 'कस्टम हेडिंग डिलीट करें',
      selectedItems: 'चुने गए आइटम',
      estimateTotal: 'कुल अनुमान',
      activeHeading: 'सक्रिय हेडिंग',
      catalogSize: 'कैटलॉग आकार',
      catalog: 'कैटलॉग',
      menuItems: 'मेन्यू आइटम',
      searchMenuItems: 'मेन्यू आइटम खोजें',
      searchPlaceholder: 'आइटम या कैटेगरी खोजें',
      addCategory: 'कैटेगरी जोड़ें',
      addItem: 'आइटम जोड़ें',
      itemName: 'आइटम नाम',
      itemPlaceholder: 'जैसे पनीर टिक्का',
      hindiItemName: 'हिंदी नाम',
      hindiItemPlaceholder: 'जैसे पनीर टिक्का',
      category: 'कैटेगरी',
      bulkItems: 'बल्क आइटम',
      bulkPlaceholder: 'हर लाइन, कॉमा या सेमीकोलन से आइटम अलग करें',
      bulkHindiItems: 'बल्क हिंदी नाम',
      bulkHindiPlaceholder: 'बल्क आइटम वाली क्रम संख्या में हिंदी नाम डालें',
      addSingleItem: 'आइटम जोड़ें',
      addBulkItems: 'बल्क आइटम जोड़ें',
      selection: 'चयन',
      generateMenu: 'मेन्यू बनाएं',
      generateEstimate: 'अनुमान बनाएं',
      downloadDocument: 'डॉक्यूमेंट डाउनलोड',
      print: 'प्रिंट',
      close: 'बंद करें',
      transferCategory: 'कैटेगरी ट्रांसफर',
      targetHeading: 'टारगेट हेडिंग',
      transferMode: 'ट्रांसफर मोड',
      copyCategory: 'कैटेगरी कॉपी करें',
      moveCategory: 'कैटेगरी मूव करें',
      cancel: 'रद्द करें',
      transfer: 'ट्रांसफर',
      selectCategory: 'कैटेगरी चुनें',
      createNewCategory: 'नई कैटेगरी बनाएं',
      edit: 'एडिट',
      rename: 'नाम बदलें',
      collapse: 'समेटें',
      expand: 'खोलें',
      restore: 'रिस्टोर',
      item: 'आइटम',
      items: 'आइटम',
      categoryTerm: 'कैटेगरी',
      categoriesTerm: 'कैटेगरी',
      person: 'व्यक्ति',
      persons: 'व्यक्ति',
      total: 'कुल',
      grandTotal: 'कुल योग',
      amount: 'राशि',
      ratePlate: 'रेट / प्लेट',
      functionMeal: 'फंक्शन / मील',
      termsConditions: 'नियम एवं शर्तें',
      selectedMenuItems: 'चुने गए मेन्यू आइटम',
      estimateQuotation: 'अनुमान / कोटेशन',
      clientSignature: 'क्लाइंट हस्ताक्षर',
      catererSignature: 'समृद्धि कैटरर्स',
      estimateNote: 'यह कंप्यूटर से बना अनुमान है। कीमतें अंतिम पुष्टि पर निर्भर हैं।',
      menuDocTitle: 'मेन्यू',
      historyDocTitle: 'इतिहास',
      savedOn: 'सेव समय',
      noHistory: 'अभी कोई इतिहास सेव नहीं है',
      noHistoryHelp: 'मेन्यू या अनुमान सेव करके इतिहास में रखें।',
      noCategories: 'अभी कोई कैटेगरी नहीं',
      noCategoriesHelp: 'शुरू करने के लिए कैटेगरी या बल्क आइटम जोड़ें।',
      noResults: 'कोई परिणाम नहीं मिला',
      noResultsHelp: 'दूसरा आइटम या कैटेगरी नाम खोजें।',
      noSelected: 'कोई आइटम चुना नहीं',
      noSelectedHelp: 'कैटलॉग से आइटम चुनें।',
      noItems: 'अभी कोई आइटम नहीं',
      untitledEvent: 'बिना नाम का कार्यक्रम',
      headingAdded: 'हेडिंग जोड़ दी गई।',
      headingDeleted: 'हेडिंग डिलीट हो गई।',
      headingNamePrompt: 'नई हेडिंग का नाम:',
      headingIconPrompt: 'छोटा आइकन या लेबल:',
      categoryNamePrompt: 'कैटेगरी नाम:',
      renameCategoryPrompt: 'कैटेगरी का नाम बदलें:',
      renameItemPrompt: 'आइटम का नाम बदलें:',
      renameItemHindiPrompt: 'हिंदी नाम:',
      categoryExists: 'यह कैटेगरी पहले से मौजूद है।',
      categoryAdded: 'कैटेगरी जोड़ दी गई।',
      categoryRenamed: 'कैटेगरी का नाम बदल गया।',
      categoryDeleted: 'कैटेगरी डिलीट हो गई।',
      categoryTransferred: 'कैटेगरी ट्रांसफर हो गई।',
      targetHeadingMissing: 'टारगेट हेडिंग चुनें।',
      targetHeadingUnavailable: 'कैटेगरी ट्रांसफर करने से पहले दूसरी हेडिंग जोड़ें।',
      itemExists: 'यह आइटम चुनी हुई कैटेगरी में पहले से है।',
      itemAdded: 'आइटम जुड़ गया और चुन लिया गया।',
      itemRenamed: 'आइटम का नाम बदल गया।',
      itemHindiSaved: 'आइटम का हिंदी नाम सेव हो गया।',
      itemDeleted: 'आइटम डिलीट हो गया।',
      remarkSaved: 'रिमार्क सेव हो गया।',
      remarkDeleted: 'रिमार्क डिलीट हो गया।',
      noRemarkToDelete: 'डिलीट करने के लिए कोई रिमार्क नहीं है।',
      bulkNeedsItems: 'पहले बल्क आइटम डालें।',
      bulkAdded: '{added} आइटम जोड़े गए। {skipped} डुप्लिकेट छोड़े गए।',
      enterItemName: 'आइटम नाम डालें।',
      chooseCategory: 'कैटेगरी चुनें।',
      noSelectedToClear: 'साफ करने के लिए कोई चुना हुआ आइटम नहीं है।',
      selectionsCleared: 'चयन साफ हो गया।',
      selectBeforeMenu: 'मेन्यू बनाने से पहले कम से कम एक आइटम चुनें।',
      estimateNeedsDetails: 'कम से कम एक हेडिंग में सदस्य और प्रति प्लेट कीमत डालें।',
      documentDownloaded: 'डॉक्यूमेंट डाउनलोड हो गया।',
      downloadNeedsData: 'डाउनलोड से पहले मेन्यू आइटम या अनुमान विवरण जोड़ें।',
      generateFirst: 'पहले मेन्यू या अनुमान बनाएं।',
      historyNeedsData: 'इतिहास सेव करने से पहले कार्यक्रम विवरण, मेन्यू आइटम या अनुमान जोड़ें।',
      historySaved: 'इतिहास सेव हो गया।',
      historyDeleted: 'इतिहास डिलीट हो गया।',
      historyRestored: 'इतिहास रिस्टोर हो गया।',
      historyPrinted: 'इतिहास प्रिंट के लिए तैयार है।',
      backupExported: 'बैकअप एक्सपोर्ट हो गया।',
      backupImported: 'बैकअप इंपोर्ट हो गया।',
      languageChanged: 'भाषा बदल गई।',
      syncUnsupported: 'ऑटो सिंक के लिए Chrome या Edge चाहिए। डेटा इस डिवाइस पर सेव रहेगा।',
      syncOpenExistingQuestion: 'शेयर की हुई सिंक फाइल चुनें। अगर फाइल नहीं है तो एक बार cancel करके नई फाइल बनाएं।',
      syncReplaceConfirm: 'क्या मौजूदा डेटा को इस सिंक डेटा से बदलना है?',
      syncConnected: 'ऑटो सिंक जुड़ गया',
      syncSaved: 'ऑटो सिंक हो गया',
      syncLoaded: 'दूसरे डिवाइस से सिंक हो गया',
      syncPermissionNeeded: 'ऑटो सिंक के लिए परमिशन चाहिए। डिवाइस जोड़ें पर क्लिक करें।',
      syncAutoReady: 'ऑटो सिंक जुड़ गया',
      syncNeedsConnect: 'पहले ऑटो सिंक जोड़ें।',
      syncError: 'सिंक फेल हुआ। सिंक फाइल फिर से जोड़ें।',
      hubOnline: 'डिवाइस जुड़े हुए हैं',
      hubOffline: 'डिवाइस हब चालू नहीं है।',
      deviceLinkCopied: 'ऐप सिंक लिंक कॉपी हो गया। इसे अपने दूसरे डिवाइस पर खोलें।',
      cloudConnected: 'Google Drive सिंक जुड़ गया',
      cloudSynced: 'Google Drive सिंक हो गया',
      cloudPairHelp: 'हर phone, tablet और laptop पर यही Google sync link पेस्ट करें।',
      cloudPairSaved: 'डिवाइस पेयर हो गया। ऑटो सिंक चालू है।',
      cloudPairError: 'यह डिवाइस पेयर नहीं हुआ। Google sync link चेक करें।',
      importInvalid: 'यह बैकअप फाइल सही नहीं है।',
      deleteHeadingConfirm: '"{name}" और उसके चुने हुए आइटम डिलीट करें?',
      clearConfirm: 'सभी चुने हुए मेन्यू आइटम साफ करें?',
      deleteItemConfirm: '"{item}" को "{category}" से हमेशा के लिए डिलीट करें?',
      deleteCategoryConfirm: '"{category}" कैटेगरी हमेशा के लिए डिलीट करें?',
      deleteHistoryConfirm: 'यह सेव इतिहास डिलीट करें?',
      restoreHistoryConfirm: 'इस इतिहास को मौजूदा ऐप में रिस्टोर करें?',
      catalogMeta: '{items} आइटम {categories} कैटेगरी में',
      catalogMetaSearch: '{items} मिलते हुए आइटम {categories} कैटेगरी में',
      selectedCount: '{count} {label}',
      activeSummary: '{heading} · {count}',
      savedHistoryStats: '{items} आइटम · {estimate}',
      syncStatusUpdated: '{status} · {time}'
    }
  };

  const DATA_LABELS_HI = {
    Breakfast: 'नाश्ता',
    Lunch: 'दोपहर का भोजन',
    Dinner: 'रात का भोजन',
    'Snacks & Starters': 'स्नैक्स और स्टार्टर',
    'Sweets & Desserts': 'मिठाई और डेजर्ट',
    'Welcome Drinks': 'स्वागत पेय',
    Soups: 'सूप',
    Salads: 'सलाद',
    'South Indian': 'दक्षिण भारतीय',
    'Indian Breads': 'भारतीय रोटी',
    'Rolls & Sandwiches': 'रोल और सैंडविच',
    Mexican: 'मेक्सिकन',
    Continental: 'कॉन्टिनेंटल',
    'Curd & Raita': 'दही और रायता',
    Starters: 'स्टार्टर',
    Paneer: 'पनीर',
    'Vegetable & Kofta': 'सब्जी और कोफ्ता',
    'Dal & Kadi': 'दाल और कढ़ी',
    Rice: 'चावल',
    'Punjabi Dhaba Special': 'पंजाबी ढाबा स्पेशल',
    Sweets: 'मिठाई',
    'Ice Cream': 'आइसक्रीम',
    Beverages: 'पेय'
  };

  const ITEM_WORDS_HI = {
    aamerkhand: 'आम्रखंड',
    achari: 'अचारी',
    adraki: 'अदरकी',
    aloo: 'आलू',
    aam: 'आम',
    apple: 'एप्पल',
    angle: 'एंगल',
    anggor: 'अंगूर',
    anarkali: 'अनारकली',
    anjeer: 'अंजीर',
    baby: 'बेबी',
    bada: 'बड़ा',
    badam: 'बादाम',
    ball: 'बॉल',
    balls: 'बॉल्स',
    barfi: 'बर्फी',
    basundi: 'बासुंदी',
    bati: 'बाटी',
    baigan: 'बैंगन',
    beans: 'बीन्स',
    bedmi: 'बेड़मी',
    besan: 'बेसन',
    beverages: 'पेय',
    bhajiya: 'भजिया',
    bhalla: 'भल्ला',
    bharta: 'भरता',
    bharwa: 'भरवा',
    bharwan: 'भरवां',
    bhindi: 'भिंडी',
    bhurji: 'भुर्जी',
    bhutte: 'भुट्टे',
    biriyani: 'बिरयानी',
    biscuit: 'बिस्किट',
    black: 'ब्लैक',
    blue: 'ब्लू',
    bombay: 'बॉम्बे',
    bread: 'ब्रेड',
    breads: 'ब्रेड',
    burfi: 'बर्फी',
    butter: 'बटर',
    buttermilk: 'छाछ',
    butterscotch: 'बटरस्कॉच',
    cabbage: 'पत्ता गोभी',
    capsicum: 'शिमला मिर्च',
    carrot: 'गाजर',
    cashewnut: 'काजू',
    chat: 'चाट',
    chaat: 'चाट',
    chakki: 'चक्की',
    chana: 'चना',
    channa: 'चना',
    cheena: 'छेना',
    cheese: 'चीज़',
    chinese: 'चाइनीज',
    chole: 'छोले',
    cholle: 'छोले',
    chocolate: 'चॉकलेट',
    chum: 'चम',
    citrus: 'सिट्रस',
    colada: 'कोलाडा',
    coffee: 'कॉफी',
    coconut: 'नारियल',
    coriander: 'धनिया',
    corn: 'कॉर्न',
    corriender: 'धनिया',
    cream: 'क्रीम',
    crispy: 'क्रिस्पी',
    cucumber: 'ककड़ी',
    curd: 'दही',
    curry: 'करी',
    custurd: 'कस्टर्ड',
    cutlet: 'कटलेट',
    dahi: 'दही',
    dal: 'दाल',
    desi: 'देसी',
    dhaba: 'ढाबा',
    dhaniya: 'धनिया',
    dil: 'दिल',
    dosa: 'डोसा',
    drink: 'ड्रिंक',
    drinks: 'ड्रिंक्स',
    dry: 'ड्राई',
    dudh: 'दूध',
    dum: 'दम',
    faini: 'फैनी',
    finger: 'फिंगर',
    fried: 'फ्राइड',
    fresh: 'फ्रेश',
    fruit: 'फ्रूट',
    garlic: 'गार्लिक',
    garden: 'गार्डन',
    gatta: 'गट्टा',
    gajar: 'गाजर',
    ghewer: 'घेवर',
    gulkand: 'गुलकंद',
    gulab: 'गुलाब',
    gujrati: 'गुजराती',
    gujarati: 'गुजराती',
    halwa: 'हलवा',
    hara: 'हरा',
    hare: 'हरे',
    harimirch: 'हरी मिर्च',
    hot: 'हॉट',
    ice: 'आइस',
    imerti: 'इमरती',
    indian: 'इंडियन',
    jal: 'जल',
    jalebi: 'जलेबी',
    jalfreizi: 'जलफ्रेजी',
    jani: 'जानी',
    jeera: 'जीरा',
    jh: 'झ',
    kabuli: 'काबुली',
    ka: 'का',
    kadai: 'कड़ाही',
    kadhai: 'कड़ाही',
    kadi: 'कढ़ी',
    kaju: 'काजू',
    kalash: 'कलश',
    kali: 'काली',
    kasariya: 'केसरिया',
    kashmiri: 'कश्मीरी',
    katli: 'कतली',
    ke: 'के',
    kesar: 'केसर',
    kesariya: 'केसरिया',
    keri: 'केरी',
    khamali: 'खमाली',
    khaman: 'खमन',
    khand: 'खंड',
    khasta: 'खस्ता',
    khatta: 'खट्टा',
    khichdi: 'खिचड़ी',
    khichi: 'खिची',
    khoya: 'खोया',
    khus: 'खस',
    ki: 'की',
    kimchee: 'किमची',
    kofta: 'कोफ्ता',
    korma: 'कोरमा',
    kulcha: 'कुलचा',
    laddu: 'लड्डू',
    lababdar: 'लाजवाब',
    lachacha: 'लच्छा',
    lahsuni: 'लहसुनी',
    lasaniya: 'लसनिया',
    lemon: 'लेमन',
    lolly: 'लॉली',
    louki: 'लौकी',
    madras: 'मद्रास',
    maharani: 'महारानी',
    maharashrtrian: 'महाराष्ट्रीयन',
    makai: 'मकई',
    makhani: 'मखनी',
    makkhan: 'मक्खन',
    makhhanwala: 'मक्खनवाला',
    malai: 'मलाई',
    malpua: 'मालपुआ',
    mango: 'मैंगो',
    manchow: 'मंचूरियन',
    masala: 'मसाला',
    masoor: 'मसूर',
    mattar: 'मटर',
    mawa: 'मावा',
    maxican: 'मेक्सिकन',
    mexican: 'मेक्सिकन',
    maysor: 'मैसूर',
    mendi: 'मेंदी',
    mendu: 'मेंदू',
    methi: 'मेथी',
    mirch: 'मिर्च',
    mirchi: 'मिर्ची',
    mishri: 'मिश्री',
    mix: 'मिक्स',
    mixed: 'मिक्स',
    minestrone: 'मिनेस्ट्रोन',
    moong: 'मूंग',
    moti: 'मोती',
    mushroom: 'मशरूम',
    mutter: 'मटर',
    muttha: 'मुट्ठा',
    naan: 'नान',
    nagets: 'नगेट्स',
    namkeen: 'नमकीन',
    nargis: 'नरगिस',
    navratan: 'नवरत्न',
    n: 'एन',
    noodles: 'नूडल्स',
    nukti: 'नुक्ती',
    onion: 'प्याज',
    of: 'ऑफ',
    orange: 'ऑरेंज',
    pak: 'पाक',
    pakodi: 'पकौड़ी',
    palak: 'पालक',
    panchmel: 'पंचमेल',
    panna: 'पन्ना',
    panther: 'पैंथर',
    papad: 'पापड़',
    parantha: 'पराठा',
    pasanda: 'पसंदा',
    pasta: 'पास्ता',
    peanut: 'मूंगफली',
    peas: 'मटर',
    pettis: 'पेटिस',
    pineapple: 'पाइनएप्पल',
    pink: 'पिंक',
    pista: 'पिस्ता',
    plain: 'प्लेन',
    poori: 'पूरी',
    pot: 'पॉट',
    potato: 'आलू',
    podhina: 'पुदीना',
    pudhina: 'पुदीना',
    pulao: 'पुलाव',
    punch: 'पंच',
    punjabi: 'पंजाबी',
    pyaz: 'प्याज',
    rabdi: 'रबड़ी',
    raita: 'रायता',
    raj: 'राज',
    rajbhog: 'राजभोग',
    rajma: 'राजमा',
    rasagulla: 'रसगुल्ला',
    rasam: 'रसम',
    rasmalai: 'रसमलाई',
    rice: 'चावल',
    rogi: 'रोगनी',
    rogni: 'रोगनी',
    roll: 'रोल',
    rolls: 'रोल्स',
    roti: 'रोटी',
    russian: 'रशियन',
    sabji: 'सब्जी',
    sabudana: 'साबूदाना',
    saag: 'साग',
    salad: 'सलाद',
    samosa: 'समोसा',
    sandwich: 'सैंडविच',
    santra: 'संतरा',
    sarson: 'सरसों',
    schezwan: 'शेजवान',
    seasonal: 'सीजनल',
    sev: 'सेव',
    shahjehani: 'शाहजहानी',
    shahi: 'शाही',
    sharbat: 'शरबत',
    shimlamich: 'शिमला मिर्च',
    shimlamirch: 'शिमला मिर्च',
    shrikhand: 'श्रीखंड',
    sitafal: 'सीताफल',
    soft: 'सॉफ्ट',
    soup: 'सूप',
    south: 'साउथ',
    special: 'स्पेशल',
    spinach: 'पालक',
    spring: 'स्प्रिंग',
    sprouted: 'अंकुरित',
    steamed: 'स्टीम्ड',
    stick: 'स्टिक',
    sticks: 'स्टिक्स',
    strawberry: 'स्ट्रॉबेरी',
    stuffed: 'स्टफ्ड',
    subji: 'सब्जी',
    subz: 'सब्ज़',
    sugar: 'शुगर',
    sweet: 'स्वीट',
    sweets: 'मिठाई',
    tama: 'टमा',
    tamator: 'टमाटर',
    tamatar: 'टमाटर',
    tandoori: 'तंदूरी',
    tawa: 'तवा',
    tahari: 'तहरी',
    thandai: 'ठंडाई',
    tikka: 'टिक्का',
    tikkiya: 'टिकिया',
    tinda: 'टिंडा',
    toast: 'टोस्ट',
    tomato: 'टमाटर',
    tomatoe: 'टमाटर',
    Turkish: 'टर्किश',
    turkish: 'टर्किश',
    uppma: 'उपमा',
    utthapum: 'उत्तपम',
    vada: 'वड़ा',
    vanilla: 'वनीला',
    veg: 'वेज',
    vegetable: 'सब्जी',
    vegetables: 'सब्जियां',
    virgin: 'वर्जिन',
    with: 'विद',
    zueq: 'ज़ौक'
  };

  let state;
  let activeDocument = null;
  let saveTimer = null;
  let toastTimer = null;
  let syncFileHandle = null;
  let syncFileLastModified = 0;
  let syncPollTimer = null;
  let syncSaveTimer = null;
  let syncWriteInProgress = false;
  let hubConnected = false;
  let hubEventSource = null;
  let hubSaveTimer = null;
  let hubWriteInProgress = false;
  let cloudSyncUrl = '';
  let cloudPollTimer = null;
  let cloudSaveTimer = null;
  let cloudWriteInProgress = false;
  let cloudRequestCounter = 0;
  let pendingTransferCategory = '';
  const els = {};

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    cacheElements();
    state = loadState();
    ensureStateShape();
    syncInputsFromState();
    bindEvents();
    renderAll();
    initCloudSync();
  }

  function cacheElements() {
    Object.assign(els, {
      tabsRow: qs('#tabsRow'),
      totalBadge: qs('#totalBadge'),
      selectedCount: qs('#selectedCount'),
      summarySelected: qs('#summarySelected'),
      summaryEstimate: qs('#summaryEstimate'),
      summaryActive: qs('#summaryActive'),
      summaryCatalog: qs('#summaryCatalog'),
      autosaveStatus: qs('#autosaveStatus'),
      languageToggle: qs('#languageToggle'),
      historyToggle: qs('#historyToggle'),
      historyList: qs('#historyList'),
      syncStatus: qs('#syncStatus'),
      importFile: qs('#importFile'),
      guestName: qs('#guestName'),
      venue: qs('#venue'),
      eventDate: qs('#eventDate'),
      contactNo: qs('#contactNo'),
      mealLabel: qs('#mealBarLabel'),
      mealDate: qs('#mealDate'),
      mealMembers: qs('#mealMembers'),
      mealPrice: qs('#mealPrice'),
      mealRemark: qs('#mealRemark'),
      mealTotal: qs('#mealTotal'),
      deleteTabBtn: qs('#deleteTabBtn'),
      search: qs('#srch'),
      customPanel: qs('#customItemPanel'),
      customName: qs('#ciName'),
      customHindiName: qs('#ciHindiName'),
      customCategory: qs('#ciCat'),
      bulkItems: qs('#bulkItems'),
      bulkHindiItems: qs('#bulkHindiItems'),
      categories: qs('#cats'),
      catalogMeta: qs('#catalogMeta'),
      preview: qs('#preview'),
      printOverlay: qs('#pmenu'),
      printContent: qs('#pmcontent'),
      transferDialog: qs('#transferDialog'),
      transferCategoryName: qs('#transferCategoryName'),
      transferTarget: qs('#transferTarget'),
      transferMode: qs('#transferMode'),
      deviceDialog: qs('#deviceDialog'),
      deviceLink: qs('#deviceLink'),
      deviceDialogStatus: qs('#deviceDialogStatus'),
      toast: qs('#toast')
    });
  }

  function bindEvents() {
    document.body.addEventListener('click', handleActionClick);
    els.tabsRow.addEventListener('click', handleTabClick);
    els.customPanel.addEventListener('submit', addCustomItem);
    els.search.addEventListener('input', () => renderCategories());
    if (els.importFile) els.importFile.addEventListener('change', importBackupFile);

    [els.guestName, els.venue, els.eventDate, els.contactNo].forEach((input) => {
      input.addEventListener('input', () => {
        saveGuestInputs();
        persistState();
      });
    });

    [els.mealDate, els.mealMembers, els.mealPrice, els.mealRemark].forEach((input) => {
      input.addEventListener('input', () => {
        saveMealInputs();
        renderMealTotal();
        renderSummary();
        persistState();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (!els.printOverlay.hidden) closeDocument();
        closeTransferDialog();
        closeDeviceDialog();
      }
    });
  }

  function handleActionClick(event) {
    const actionTarget = event.target.closest('[data-action]');
    if (!actionTarget) return;

    const { action } = actionTarget.dataset;
    if (!action) return;

    switch (action) {
      case 'toggle-language':
        toggleLanguage();
        break;
      case 'save-history':
        saveHistorySnapshot();
        break;
      case 'toggle-history':
        toggleHistoryPanel();
        break;
      case 'print-history':
        openHistoryDocument();
        break;
      case 'history-restore':
        restoreHistoryEntry(actionTarget.dataset.id);
        break;
      case 'history-print':
        openHistoryDocument(actionTarget.dataset.id);
        break;
      case 'history-delete':
        deleteHistoryEntry(actionTarget.dataset.id);
        break;
      case 'connect-sync':
        openDeviceDialog();
        break;
      case 'pair-cloud-device':
        pairCloudDevice();
        break;
      case 'copy-device-link':
        copyDeviceLink();
        break;
      case 'close-device-dialog':
        closeDeviceDialog();
        break;
      case 'load-sync':
        loadFromSyncFile({ confirmReplace: true });
        break;
      case 'save-sync':
        saveToSyncFile();
        break;
      case 'export-backup':
        exportBackup();
        break;
      case 'import-backup':
        if (els.importFile) els.importFile.click();
        break;
      case 'add-tab':
        addNewTab();
        break;
      case 'save-remark':
        saveRemark();
        break;
      case 'delete-remark':
        deleteRemark();
        break;
      case 'clear':
        clearSelections();
        break;
      case 'menu':
        openMenuDocument();
        break;
      case 'estimate':
        openEstimateDocument();
        break;
      case 'download':
        downloadCurrentDocument();
        break;
      case 'download-document':
        downloadActiveDocument();
        break;
      case 'print':
        window.print();
        break;
      case 'close-document':
        closeDocument();
        break;
      case 'toggle-custom':
        toggleCustomPanel();
        break;
      case 'add-category':
        addCategory();
        break;
      case 'add-bulk':
        addBulkItems();
        break;
      case 'toggle-category':
        toggleCategory(actionTarget);
        break;
      case 'rename-category':
        renameCategory(actionTarget.dataset.cat);
        break;
      case 'transfer-category':
        openTransferDialog(actionTarget.dataset.cat);
        break;
      case 'delete-category':
        deleteCategory(actionTarget.dataset.cat);
        break;
      case 'toggle-item':
        toggleItem(actionTarget.dataset.cat, actionTarget.dataset.item);
        break;
      case 'rename-item':
        renameItem(actionTarget.dataset.cat, actionTarget.dataset.item);
        break;
      case 'delete-item':
        deleteItem(actionTarget.dataset.cat, actionTarget.dataset.item);
        break;
      case 'remove-selected':
        removeSelectedItem(actionTarget.dataset.tab, actionTarget.dataset.cat, actionTarget.dataset.item);
        break;
      case 'delete-tab':
        deleteCurrentTab();
        break;
      case 'close-transfer':
        closeTransferDialog();
        break;
      case 'confirm-transfer':
        confirmTransferCategory();
        break;
      default:
        break;
    }
  }

  function handleTabClick(event) {
    const tab = event.target.closest('[data-tab]');
    if (!tab) return;
    switchTab(tab.dataset.tab);
  }

  function loadState() {
    const savedFromPage = readEmbeddedState();
    const savedFromStorage = readStoredState();
    return mergeState(createBaseState(), savedFromPage || savedFromStorage);
  }

  function createBaseState() {
    return {
      db: deepClone(DEFAULT_DB),
      mealInfo: {},
      selected: {},
      currentTab: Object.keys(DEFAULT_DB)[0] || '',
      guest: { name: '', venue: '', date: '', contact: '' },
      itemHindiNames: {},
      history: [],
      lang: 'en',
      updatedAt: new Date().toISOString()
    };
  }

  function readEmbeddedState() {
    if (window.__SAVED_STATE__) return window.__SAVED_STATE__;

    if (window.__SAVED_DB__) {
      return {
        db: window.__SAVED_DB__,
        mealInfo: window.__SAVED_MI__ || {},
        selected: window.__SAVED_SEL__ || {},
        currentTab: window.__SAVED_CUR__,
        guest: {
          name: window.__SAVED_GUEST__?.name || '',
          venue: window.__SAVED_GUEST__?.venue || '',
          date: window.__SAVED_GUEST__?.date || '',
          contact: window.__SAVED_GUEST__?.contact || ''
        }
      };
    }

    return null;
  }

  function readStoredState() {
    const keys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];

    for (const key of keys) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw);
      } catch (error) {
        // Ignore broken saved data and continue to the next possible source.
      }
    }

    return null;
  }

  function mergeState(baseState, savedState) {
    if (!savedState || typeof savedState !== 'object') return baseState;

    return {
      db: isPlainObject(savedState.db) ? savedState.db : baseState.db,
      mealInfo: isPlainObject(savedState.mealInfo) ? savedState.mealInfo : {},
      selected: isPlainObject(savedState.selected) ? savedState.selected : {},
      currentTab: typeof savedState.currentTab === 'string' ? savedState.currentTab : baseState.currentTab,
      guest: { ...baseState.guest, ...(isPlainObject(savedState.guest) ? savedState.guest : {}) },
      itemHindiNames: isPlainObject(savedState.itemHindiNames) ? savedState.itemHindiNames : {},
      history: Array.isArray(savedState.history) ? savedState.history.slice(0, HISTORY_LIMIT) : [],
      lang: savedState.lang === 'hi' ? 'hi' : 'en',
      updatedAt: typeof savedState.updatedAt === 'string' ? savedState.updatedAt : baseState.updatedAt
    };
  }

  function ensureStateShape() {
    if (!isPlainObject(state.db) || !Object.keys(state.db).length) {
      state.db = deepClone(DEFAULT_DB);
    }

    if (!isPlainObject(state.mealInfo)) state.mealInfo = {};
    if (!isPlainObject(state.selected)) state.selected = {};
    if (!isPlainObject(state.itemHindiNames)) state.itemHindiNames = {};
    if (!Array.isArray(state.history)) state.history = [];
    state.history = state.history.filter((entry) => entry && typeof entry === 'object').slice(0, HISTORY_LIMIT);
    state.lang = state.lang === 'hi' ? 'hi' : 'en';
    if (!state.updatedAt) state.updatedAt = new Date().toISOString();

    Object.entries(state.db).forEach(([tabKey, tab]) => {
      if (!tab || typeof tab !== 'object') state.db[tabKey] = { icon: '', name: tabKey, cats: {} };
      if (!isPlainObject(state.db[tabKey].cats)) state.db[tabKey].cats = {};
      if (!state.mealInfo[tabKey]) state.mealInfo[tabKey] = createEmptyMealInfo();
      if (!state.mealInfo[tabKey].date) state.mealInfo[tabKey].date = getTodayInputDate();
      if (typeof state.mealInfo[tabKey].remark !== 'string') state.mealInfo[tabKey].remark = '';
      if (!state.selected[tabKey]) state.selected[tabKey] = {};

      Object.keys(state.db[tabKey].cats).forEach((category) => {
        if (!Array.isArray(state.db[tabKey].cats[category])) state.db[tabKey].cats[category] = [];
        state.db[tabKey].cats[category] = sortTextList(uniqueTextList(state.db[tabKey].cats[category]));
        if (!Array.isArray(state.selected[tabKey][category])) state.selected[tabKey][category] = [];
        state.selected[tabKey][category] = sortTextList(state.selected[tabKey][category].filter((item) =>
          state.db[tabKey].cats[category].includes(item)
        ));
      });

      Object.keys(state.selected[tabKey]).forEach((category) => {
        if (!state.db[tabKey].cats[category]) delete state.selected[tabKey][category];
      });
    });

    if (!state.db[state.currentTab]) {
      state.currentTab = Object.keys(state.db)[0] || '';
    }
  }

  function createEmptyMealInfo() {
    return { members: '', price: '', date: getTodayInputDate(), time: '', remark: '' };
  }

  function syncInputsFromState() {
    els.guestName.value = state.guest.name || '';
    els.venue.value = state.guest.venue || '';
    els.eventDate.value = state.guest.date || '';
    els.contactNo.value = state.guest.contact || '';
    syncMealInputs();
  }

  function syncMealInputs() {
    const info = state.mealInfo[state.currentTab] || {};
    els.mealDate.value = info.date || getTodayInputDate();
    els.mealMembers.value = info.members || '';
    els.mealPrice.value = info.price || '';
    els.mealRemark.value = info.remark || '';
  }

  function saveGuestInputs() {
    state.guest = {
      name: els.guestName.value.trim(),
      venue: els.venue.value.trim(),
      date: els.eventDate.value,
      contact: els.contactNo.value.trim()
    };
  }

  function saveMealInputs() {
    if (!state.currentTab) return;
    state.mealInfo[state.currentTab] = {
      date: els.mealDate.value || getTodayInputDate(),
      time: '',
      members: els.mealMembers.value,
      price: els.mealPrice.value,
      remark: els.mealRemark.value.trim()
    };
  }

  function persistState(options = {}) {
    if (options.touch !== false) state.updatedAt = new Date().toISOString();

    clearTimeout(saveTimer);
    els.autosaveStatus.textContent = t('saving');

    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        els.autosaveStatus.textContent = t('autosaved');
        if (options.sync !== false) scheduleSyncWrite();
      } catch (error) {
        els.autosaveStatus.textContent = t('notSaved');
      }
    }, 180);
  }

  function renderAll() {
    applyLanguage();
    renderTabs();
    renderMealBar();
    renderCategoryOptions();
    renderCategories();
    renderPreview();
    renderHistory();
    updateCounts();
    renderSummary();
    renderSyncStatus();
  }

  function applyLanguage() {
    const lang = getLang();
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    document.body.classList.toggle('is-hindi', lang === 'hi');

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder));
    });

    document.querySelectorAll('[data-i18n-title]').forEach((node) => {
      const value = t(node.dataset.i18nTitle);
      node.setAttribute('title', value);
      node.setAttribute('aria-label', value);
    });

    els.languageToggle.textContent = lang === 'hi' ? t('switchToEnglish') : t('switchToHindi');
    els.languageToggle.setAttribute('aria-pressed', String(lang === 'hi'));
    els.historyToggle.textContent = els.historyList.hidden ? t('showHistory') : t('hideHistory');
  }

  function renderTabs() {
    const fragment = document.createDocumentFragment();

    Object.entries(state.db).forEach(([key, tab]) => {
      const count = countTab(key);
      const button = createNode('button', {
        className: 'tab',
        type: 'button',
        role: 'tab',
        id: `tab-${key}`,
        dataset: { tab: key },
        attributes: { 'aria-selected': String(key === state.currentTab) }
      });

      button.append(document.createTextNode(`${tab.icon || ''} ${displayLabel(tab.name || key)}`.trim()));

      if (count > 0) {
        button.append(createNode('span', { className: 'tab-count', text: String(count) }));
      }

      fragment.append(button);
    });

    els.tabsRow.replaceChildren(fragment);
  }

  function renderMealBar() {
    const tab = getCurrentTab();
    els.mealLabel.textContent = tab ? `${tab.icon || ''} ${displayLabel(tab.name)}`.trim() : '-';
    els.deleteTabBtn.hidden = !isCustomTab(state.currentTab);
    els.deleteTabBtn.dataset.action = 'delete-tab';
    renderMealTotal();
  }

  function renderMealTotal() {
    const members = Number(els.mealMembers.value) || 0;
    const price = Number(els.mealPrice.value) || 0;
    els.mealTotal.textContent = members > 0 && price > 0 ? `${t('total')} ${formatCurrency(members * price)}` : '';
  }

  function renderCategoryOptions() {
    const tab = getCurrentTab();
    els.customCategory.replaceChildren();

    els.customCategory.append(createNode('option', {
      text: t('selectCategory'),
      attributes: { value: '' }
    }));

    Object.keys(tab?.cats || {}).forEach((category) => {
      els.customCategory.append(createNode('option', {
        text: displayLabel(category),
        attributes: { value: category }
      }));
    });

    els.customCategory.append(createNode('option', {
      text: t('createNewCategory'),
      attributes: { value: NEW_CATEGORY_VALUE }
    }));
  }

  function renderCategories() {
    const tab = getCurrentTab();
    const query = normalize(els.search.value);
    const categories = tab?.cats || {};
    const fragment = document.createDocumentFragment();
    let visibleCategories = 0;
    let visibleItems = 0;

    Object.entries(categories).forEach(([category, items]) => {
      const categoryMatches = matchesSearch(category, query);
      const visible = query
        ? items.filter((item) => categoryMatches || matchesSearch(item, query))
        : items;
      const sortedVisible = sortTextList(visible);

      if (!visible.length && query) return;
      visibleCategories += 1;
      visibleItems += visible.length;
      fragment.append(buildCategoryCard(category, sortedVisible, items.length));
    });

    els.categories.replaceChildren();

    if (!Object.keys(categories).length) {
      els.categories.append(buildEmptyState(t('noCategories'), t('noCategoriesHelp')));
    } else if (!visibleCategories) {
      els.categories.append(buildEmptyState(t('noResults'), t('noResultsHelp')));
    } else {
      els.categories.append(fragment);
    }

    els.catalogMeta.textContent = query
      ? t('catalogMetaSearch', { items: visibleItems, categories: visibleCategories })
      : t('catalogMeta', { items: visibleItems, categories: visibleCategories });
  }

  function buildCategoryCard(category, visibleItems, totalItems) {
    const card = createNode('article', { className: 'category-card' });
    const bodyId = `cat-${slugify(category)}-${Math.random().toString(36).slice(2, 7)}`;
    const body = createNode('div', { className: 'item-grid', attributes: { id: bodyId } });

    visibleItems.forEach((item) => {
      body.append(buildItemChip(category, item));
    });

    if (!visibleItems.length) {
      body.append(buildEmptyState(t('noItems'), ''));
    }

    const head = createNode('div', { className: 'category-head' });
    const title = createNode('div', { className: 'category-title' });
    title.append(
      createNode('span', { text: String(totalItems) }),
      createNode('h3', { text: displayLabel(category) })
    );

    const actions = createNode('div', { className: 'category-actions' });
    actions.append(
      createNode('button', {
        text: t('collapse'),
        dataset: { action: 'toggle-category', target: bodyId },
        attributes: { type: 'button', 'aria-controls': bodyId, 'aria-expanded': 'true' }
      }),
      createNode('button', {
        text: t('rename'),
        dataset: { action: 'rename-category', cat: category },
        attributes: { type: 'button' }
      }),
      createNode('button', {
        className: 'transfer',
        text: t('transfer'),
        dataset: { action: 'transfer-category', cat: category },
        attributes: { type: 'button' }
      }),
      createNode('button', {
        className: 'delete',
        text: t('delete'),
        dataset: { action: 'delete-category', cat: category },
        attributes: { type: 'button' }
      })
    );

    head.append(title, actions);
    card.append(head, body);
    return card;
  }

  function buildItemChip(category, item) {
    const wrapper = createNode('div', { className: 'item-chip-wrap' });
    const selected = isSelected(state.currentTab, category, item);
    const itemLabel = displayItemLabel(item);

    wrapper.append(
      createNode('button', {
        className: 'item-chip',
        text: itemLabel,
        dataset: { action: 'toggle-item', cat: category, item },
        attributes: { type: 'button', 'aria-pressed': String(selected), title: item }
      }),
      createNode('button', {
        className: 'item-edit',
        text: t('edit'),
        dataset: { action: 'rename-item', cat: category, item },
        attributes: { type: 'button', title: `${t('edit')} ${itemLabel}`, 'aria-label': `${t('edit')} ${itemLabel}` }
      }),
      createNode('button', {
        className: 'item-delete',
        text: '×',
        dataset: { action: 'delete-item', cat: category, item },
        attributes: { type: 'button', title: `${t('delete')} ${itemLabel}`, 'aria-label': `${t('delete')} ${itemLabel}` }
      })
    );

    return wrapper;
  }

  function renderPreview() {
    const fragment = document.createDocumentFragment();
    let hasAny = false;

    Object.entries(state.db).forEach(([tabKey, tab]) => {
      if (!countTab(tabKey)) return;
      hasAny = true;

      const group = createNode('section', { className: 'selection-group' });
      group.append(createNode('div', {
        className: 'selection-heading',
        text: `${tab.icon || ''} ${displayLabel(tab.name || tabKey).toUpperCase()}`.trim()
      }));

      Object.entries(state.selected[tabKey] || {}).forEach(([category, items]) => {
        if (!items.length) return;
        group.append(createNode('div', { className: 'selection-category', text: displayLabel(category) }));

        sortTextList(items).forEach((item) => {
          const row = createNode('div', { className: 'selection-item' });
          const itemLabel = displayItemLabel(item);
          row.append(
            createNode('span', { text: itemLabel }),
            createNode('button', {
              className: 'remove-selection',
              text: '×',
              dataset: { action: 'remove-selected', tab: tabKey, cat: category, item },
              attributes: { type: 'button', title: `${t('delete')} ${itemLabel}`, 'aria-label': `${t('delete')} ${itemLabel}` }
            })
          );
          group.append(row);
        });
      });

      fragment.append(group);
    });

    els.preview.replaceChildren(hasAny ? fragment : buildEmptyState(t('noSelected'), t('noSelectedHelp')));
  }

  function renderHistory() {
    const wasHidden = els.historyList.hidden;
    els.historyList.replaceChildren();

    if (!state.history.length) {
      els.historyList.append(buildEmptyState(t('noHistory'), t('noHistoryHelp')));
      els.historyToggle.textContent = wasHidden ? t('showHistory') : t('hideHistory');
      return;
    }

    state.history.forEach((entry) => {
      const card = createNode('article', { className: 'history-card' });
      const title = entry.guest?.name || t('untitledEvent');
      const estimate = entry.estimateTotal ? formatCurrency(entry.estimateTotal) : formatCurrency(0);

      card.append(
        createNode('h3', { text: title }),
        createNode('p', { text: `${t('savedOn')}: ${formatDateTime(entry.savedAt)}` }),
        createNode('p', { text: [formatDate(entry.guest?.date), entry.guest?.venue, entry.guest?.contact].filter(Boolean).join(' · ') || '-' })
      );

      const stats = createNode('div', { className: 'history-stats' });
      stats.append(
        createNode('span', { className: 'history-pill', text: itemCount(entry.selectedTotal || 0) }),
        createNode('span', { className: 'history-pill', text: estimate })
      );

      const actions = createNode('div', { className: 'history-actions' });
      actions.append(
        createNode('button', {
          className: 'btn btn-secondary',
          text: t('restore'),
          dataset: { action: 'history-restore', id: entry.id },
          attributes: { type: 'button' }
        }),
        createNode('button', {
          className: 'btn btn-accent',
          text: t('print'),
          dataset: { action: 'history-print', id: entry.id },
          attributes: { type: 'button' }
        }),
        createNode('button', {
          className: 'btn btn-secondary',
          text: t('delete'),
          dataset: { action: 'history-delete', id: entry.id },
          attributes: { type: 'button' }
        })
      );

      card.append(stats, actions);
      els.historyList.append(card);
    });

    els.historyToggle.textContent = wasHidden ? t('showHistory') : t('hideHistory');
  }

  function updateCounts() {
    const total = getSelectedTotal();
    els.totalBadge.textContent = itemCount(total);
    els.selectedCount.textContent = String(total);
  }

  function renderSummary() {
    const selectedTotal = getSelectedTotal();
    const estimateTotal = getEstimateRows().reduce((sum, row) => sum + row.total, 0);
    const tab = getCurrentTab();
    const activeSelected = countTab(state.currentTab);
    const catalogSize = Object.values(tab?.cats || {}).reduce((sum, items) => sum + items.length, 0);

    els.summarySelected.textContent = itemCount(selectedTotal);
    els.summaryEstimate.textContent = estimateTotal ? formatCurrency(estimateTotal) : formatCurrency(0);
    els.summaryActive.textContent = tab ? t('activeSummary', { heading: displayLabel(tab.name), count: activeSelected }) : '-';
    els.summaryCatalog.textContent = itemCount(catalogSize);
  }

  function renderSyncStatus(message) {
    if (message) {
      els.syncStatus.textContent = t('syncStatusUpdated', { status: message, time: formatDateTime(new Date().toISOString()) });
      return;
    }

    if (cloudSyncUrl) {
      els.syncStatus.textContent = t('cloudConnected');
      return;
    }

    if (hubConnected) {
      els.syncStatus.textContent = t('hubOnline');
      return;
    }

    if (syncFileHandle) {
      els.syncStatus.textContent = t('syncConnected');
      return;
    }

    els.syncStatus.textContent = t('localStorageReady');
  }

  function switchTab(key) {
    if (!state.db[key] || key === state.currentTab) return;
    saveGuestInputs();
    saveMealInputs();
    state.currentTab = key;
    syncMealInputs();
    els.search.value = '';
    renderAll();
    persistState();
  }

  function toggleLanguage() {
    state.lang = getLang() === 'hi' ? 'en' : 'hi';
    renderAll();
    persistState();
    notify(t('languageChanged'));
  }

  function saveRemark() {
    saveMealInputs();
    renderAll();
    persistState();
    notify(t('remarkSaved'));
  }

  function deleteRemark() {
    const info = state.mealInfo[state.currentTab];
    if (!info?.remark && !els.mealRemark.value.trim()) {
      notify(t('noRemarkToDelete'));
      return;
    }

    if (!state.mealInfo[state.currentTab]) state.mealInfo[state.currentTab] = createEmptyMealInfo();
    state.mealInfo[state.currentTab].remark = '';
    els.mealRemark.value = '';
    renderAll();
    persistState();
    notify(t('remarkDeleted'));
  }

  function addNewTab() {
    const name = window.prompt(t('headingNamePrompt'), getLang() === 'hi' ? 'रिसेप्शन' : 'Reception');
    if (!name || !name.trim()) return;

    const icon = (window.prompt(t('headingIconPrompt'), '🎊') || '🎊').trim();
    const key = createCustomTabKey(name);
    state.db[key] = { icon, name: name.trim(), cats: {} };
    state.mealInfo[key] = createEmptyMealInfo();
    state.selected[key] = {};
    state.currentTab = key;

    syncMealInputs();
    renderAll();
    persistState();
    notify(t('headingAdded'));
  }

  function deleteCurrentTab() {
    if (!isCustomTab(state.currentTab)) return;

    const tabName = getCurrentTab()?.name || state.currentTab;
    if (!window.confirm(t('deleteHeadingConfirm', { name: displayLabel(tabName) }))) return;

    delete state.db[state.currentTab];
    delete state.mealInfo[state.currentTab];
    delete state.selected[state.currentTab];
    state.currentTab = Object.keys(state.db)[0] || '';

    syncMealInputs();
    renderAll();
    persistState();
    notify(t('headingDeleted'));
  }

  function toggleCustomPanel() {
    els.customPanel.hidden = !els.customPanel.hidden;
    if (!els.customPanel.hidden) {
      renderCategoryOptions();
      els.customName.focus();
    }
  }

  function addCategory() {
    const category = window.prompt(t('categoryNamePrompt'));
    if (!category || !category.trim()) return;
    const name = category.trim();
    const tab = getCurrentTab();

    if (findCategoryKey(tab, name)) {
      notify(t('categoryExists'));
      return;
    }

    tab.cats[name] = [];
    if (!state.selected[state.currentTab]) state.selected[state.currentTab] = {};
    state.selected[state.currentTab][name] = [];

    renderAll();
    persistState();
    notify(t('categoryAdded'));
  }

  function addCustomItem(event) {
    event.preventDefault();

    const itemName = els.customName.value.trim();
    if (!itemName) {
      notify(t('enterItemName'));
      els.customName.focus();
      return;
    }

    const category = resolveSelectedCategory();
    if (!category) return;

    const result = addItemsToCategory(category, [{
      name: itemName,
      hindiName: els.customHindiName.value.trim()
    }], { select: true });
    if (!result.added) {
      notify(t('itemExists'));
      return;
    }

    els.customName.value = '';
    els.customHindiName.value = '';
    renderAll();
    persistState();
    notify(t('itemAdded'));
  }

  function addBulkItems() {
    const itemRows = parseBulkItemRows(els.bulkItems.value, els.bulkHindiItems.value);
    if (!itemRows.length) {
      notify(t('bulkNeedsItems'));
      els.bulkItems.focus();
      return;
    }

    const category = resolveSelectedCategory();
    if (!category) return;

    const result = addItemsToCategory(category, itemRows, { select: true });
    els.bulkItems.value = '';
    els.bulkHindiItems.value = '';
    renderAll();
    persistState();
    notify(t('bulkAdded', { added: result.added, skipped: result.skipped }));
  }

  function resolveSelectedCategory() {
    let category = els.customCategory.value;

    if (!category) {
      notify(t('chooseCategory'));
      els.customCategory.focus();
      return '';
    }

    if (category === NEW_CATEGORY_VALUE) {
      const newCategory = window.prompt(t('categoryNamePrompt'));
      if (!newCategory || !newCategory.trim()) return '';
      category = newCategory.trim();
    }

    const tab = getCurrentTab();
    const existing = findCategoryKey(tab, category);
    category = existing || category;

    if (!tab.cats[category]) tab.cats[category] = [];
    if (!state.selected[state.currentTab]) state.selected[state.currentTab] = {};
    if (!state.selected[state.currentTab][category]) state.selected[state.currentTab][category] = [];

    return category;
  }

  function addItemsToCategory(category, items, options = {}) {
    const tab = getCurrentTab();
    if (!tab.cats[category]) tab.cats[category] = [];
    const selected = ensureSelectionArray(state.currentTab, category);
    const existing = new Set(tab.cats[category].map(normalize));
    let added = 0;
    let skipped = 0;

    uniqueItemEntries(items).forEach((entry) => {
      const item = entry.name;
      if (existing.has(normalize(item))) {
        skipped += 1;
        return;
      }

      tab.cats[category].push(item);
      existing.add(normalize(item));
      saveItemHindiName(item, entry.hindiName);
      added += 1;

      if (options.select && !selected.includes(item)) {
        selected.push(item);
      }
    });

    tab.cats[category] = sortTextList(tab.cats[category]);
    state.selected[state.currentTab][category] = sortTextList(selected);

    return { added, skipped };
  }

  function renameCategory(category) {
    const tab = getCurrentTab();
    if (!tab?.cats?.[category]) return;

    const newName = window.prompt(t('renameCategoryPrompt'), category);
    if (!newName || !newName.trim() || newName.trim() === category) return;
    const cleaned = newName.trim();
    const existing = findCategoryKey(tab, cleaned);

    if (existing && existing !== category) {
      notify(t('categoryExists'));
      return;
    }

    tab.cats[cleaned] = tab.cats[category];
    delete tab.cats[category];
    state.selected[state.currentTab][cleaned] = state.selected[state.currentTab][category] || [];
    delete state.selected[state.currentTab][category];

    renderAll();
    persistState();
    notify(t('categoryRenamed'));
  }

  function renameItem(category, item) {
    const items = getCurrentTab()?.cats?.[category];
    if (!Array.isArray(items)) return;

    const newName = window.prompt(t('renameItemPrompt'), item);
    if (!newName || !newName.trim()) return;
    const cleaned = newName.trim();

    if (items.some((entry) => normalize(entry) === normalize(cleaned) && entry !== item)) {
      notify(t('itemExists'));
      return;
    }

    const index = items.indexOf(item);
    if (index !== -1) items[index] = cleaned;

    const selected = state.selected[state.currentTab]?.[category] || [];
    const selectedIndex = selected.indexOf(item);
    if (selectedIndex !== -1) selected[selectedIndex] = cleaned;
    state.db[state.currentTab].cats[category] = sortTextList(items);
    state.selected[state.currentTab][category] = sortTextList(selected);

    const currentHindiName = getStoredItemHindiName(item) || buildHindiItemFallback(item);
    const hindiName = window.prompt(t('renameItemHindiPrompt'), currentHindiName);
    moveItemHindiName(item, cleaned);
    if (hindiName !== null) {
      saveItemHindiName(cleaned, hindiName.trim());
    }

    renderAll();
    persistState();
    notify(t('itemRenamed'));
  }

  function openTransferDialog(category) {
    const targets = Object.entries(state.db).filter(([key]) => key !== state.currentTab);
    if (!targets.length) {
      notify(t('targetHeadingUnavailable'));
      return;
    }

    pendingTransferCategory = category;
    els.transferCategoryName.textContent = displayLabel(category);
    els.transferTarget.replaceChildren();

    targets.forEach(([key, tab]) => {
      els.transferTarget.append(createNode('option', {
        text: `${tab.icon || ''} ${displayLabel(tab.name || key)}`.trim(),
        attributes: { value: key }
      }));
    });

    if (typeof els.transferDialog.showModal === 'function') {
      els.transferDialog.showModal();
    } else {
      els.transferDialog.setAttribute('open', '');
    }
  }

  function closeTransferDialog() {
    if (!els.transferDialog.open) return;
    els.transferDialog.close();
    pendingTransferCategory = '';
  }

  function confirmTransferCategory() {
    const category = pendingTransferCategory;
    const targetKey = els.transferTarget.value;
    const mode = els.transferMode.value;
    const sourceTab = getCurrentTab();
    const targetTab = state.db[targetKey];

    if (!category || !sourceTab?.cats?.[category]) return;
    if (!targetTab) {
      notify(t('targetHeadingMissing'));
      return;
    }

    if (!targetTab.cats[category]) targetTab.cats[category] = [];
    if (!state.selected[targetKey]) state.selected[targetKey] = {};
    if (!state.selected[targetKey][category]) state.selected[targetKey][category] = [];

    mergeTextList(targetTab.cats[category], sourceTab.cats[category]);
    mergeTextList(state.selected[targetKey][category], state.selected[state.currentTab]?.[category] || []);
    targetTab.cats[category] = sortTextList(targetTab.cats[category]);
    state.selected[targetKey][category] = sortTextList(state.selected[targetKey][category]);

    if (mode === 'move') {
      delete sourceTab.cats[category];
      delete state.selected[state.currentTab][category];
    }

    closeTransferDialog();
    renderAll();
    persistState();
    notify(t('categoryTransferred'));
  }

  function toggleCategory(button) {
    const body = document.getElementById(button.dataset.target);
    if (!body) return;

    const willHide = !body.hidden;
    body.hidden = willHide;
    button.textContent = willHide ? t('expand') : t('collapse');
    button.setAttribute('aria-expanded', String(!willHide));
  }

  function toggleItem(category, item) {
    const selected = ensureSelectionArray(state.currentTab, category);
    const index = selected.indexOf(item);

    if (index === -1) {
      selected.push(item);
    } else {
      selected.splice(index, 1);
    }

    state.selected[state.currentTab][category] = sortTextList(selected);
    renderCategories();
    renderPreview();
    renderTabs();
    updateCounts();
    renderSummary();
    persistState();
  }

  function deleteItem(category, item) {
    if (!window.confirm(t('deleteItemConfirm', { item: displayItemLabel(item), category: displayLabel(category) }))) return;

    const items = getCurrentTab().cats[category] || [];
    state.db[state.currentTab].cats[category] = items.filter((entry) => entry !== item);
    removeSelectedItem(state.currentTab, category, item, { silent: true });

    renderAll();
    persistState();
    notify(t('itemDeleted'));
  }

  function deleteCategory(category) {
    if (!window.confirm(t('deleteCategoryConfirm', { category: displayLabel(category) }))) return;

    delete state.db[state.currentTab].cats[category];
    delete state.selected[state.currentTab][category];

    renderAll();
    persistState();
    notify(t('categoryDeleted'));
  }

  function removeSelectedItem(tabKey, category, item, options = {}) {
    const selected = state.selected[tabKey]?.[category];
    if (!selected) return;

    const index = selected.indexOf(item);
    if (index !== -1) selected.splice(index, 1);

    if (!options.silent) {
      renderCategories();
      renderPreview();
      renderTabs();
      updateCounts();
      renderSummary();
      persistState();
    }
  }

  function clearSelections() {
    if (!getSelectedTotal()) {
      notify(t('noSelectedToClear'));
      return;
    }

    if (!window.confirm(t('clearConfirm'))) return;

    Object.values(state.selected).forEach((tabSelection) => {
      Object.keys(tabSelection).forEach((category) => {
        tabSelection[category] = [];
      });
    });

    renderAll();
    persistState();
    notify(t('selectionsCleared'));
  }

  function saveHistorySnapshot() {
    saveGuestInputs();
    saveMealInputs();

    if (!hasHistoryWorthyData()) {
      notify(t('historyNeedsData'));
      return;
    }

    const entry = buildHistoryEntry();
    state.history.unshift(entry);
    state.history = state.history.slice(0, HISTORY_LIMIT);

    renderHistory();
    persistState();
    notify(t('historySaved'));
  }

  function buildHistoryEntry() {
    const selectedSections = buildSelectedSections();
    const estimateRows = getEstimateRowsRaw();
    const estimateTotal = estimateRows.reduce((sum, row) => sum + row.total, 0);

    return {
      id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      savedAt: new Date().toISOString(),
      guest: deepClone(state.guest),
      selected: deepClone(state.selected),
      mealInfo: deepClone(state.mealInfo),
      itemHindiNames: deepClone(state.itemHindiNames),
      currentTab: state.currentTab,
      selectedSections,
      estimateRows,
      selectedTotal: getSelectedTotal(),
      estimateTotal
    };
  }

  function buildSelectedSections() {
    return Object.entries(state.db).reduce((sections, [tabKey, tab]) => {
      if (!countTab(tabKey)) return sections;

      const categories = Object.entries(state.selected[tabKey] || {})
        .filter(([, items]) => items.length)
        .map(([category, items]) => ({ name: category, items: sortTextList(items) }));

      if (categories.length) {
        sections.push({
          tabKey,
          tabName: tab.name || tabKey,
          icon: tab.icon || '',
          remark: state.mealInfo[tabKey]?.remark || '',
          categories
        });
      }

      return sections;
    }, []);
  }

  function toggleHistoryPanel() {
    els.historyList.hidden = !els.historyList.hidden;
    renderHistory();
  }

  function findHistoryEntry(id) {
    return state.history.find((entry) => entry.id === id);
  }

  function restoreHistoryEntry(id) {
    const entry = findHistoryEntry(id);
    if (!entry) return;
    if (!window.confirm(t('restoreHistoryConfirm'))) return;

    state.guest = { ...createBaseState().guest, ...(entry.guest || {}) };
    state.mealInfo = isPlainObject(entry.mealInfo) ? deepClone(entry.mealInfo) : {};
    state.selected = isPlainObject(entry.selected) ? deepClone(entry.selected) : {};
    state.itemHindiNames = { ...(state.itemHindiNames || {}), ...(isPlainObject(entry.itemHindiNames) ? entry.itemHindiNames : {}) };
    state.currentTab = entry.currentTab || state.currentTab;
    ensureHistorySelectionsInDb(entry);
    ensureStateShape();
    syncInputsFromState();
    renderAll();
    persistState();
    notify(t('historyRestored'));
  }

  function ensureHistorySelectionsInDb(entry) {
    Object.entries(state.selected || {}).forEach(([tabKey, categories]) => {
      if (!state.db[tabKey]) {
        const section = (entry.selectedSections || []).find((candidate) => candidate.tabKey === tabKey);
        state.db[tabKey] = {
          icon: section?.icon || '',
          name: section?.tabName || tabKey,
          cats: {}
        };
      }

      Object.entries(categories || {}).forEach(([category, items]) => {
        if (!state.db[tabKey].cats[category]) state.db[tabKey].cats[category] = [];
        mergeTextList(state.db[tabKey].cats[category], items || []);
      });
    });
  }

  function deleteHistoryEntry(id) {
    if (!window.confirm(t('deleteHistoryConfirm'))) return;
    state.history = state.history.filter((entry) => entry.id !== id);
    renderHistory();
    persistState();
    notify(t('historyDeleted'));
  }

  function openMenuDocument() {
    saveGuestInputs();
    saveMealInputs();
    applyCurrentGeneratedDate();

    if (!getSelectedTotal()) {
      notify(t('selectBeforeMenu'));
      return;
    }

    activeDocument = {
      type: 'menu',
      title: 'Samruddhi Menu',
      html: buildMenuHtml()
    };

    showDocument();
  }

  function openEstimateDocument() {
    saveGuestInputs();
    saveMealInputs();
    applyCurrentGeneratedDate();

    if (!getEstimateRows().length) {
      notify(t('estimateNeedsDetails'));
      return;
    }

    activeDocument = {
      type: 'estimate',
      title: 'Samruddhi Estimate',
      html: buildEstimateHtml()
    };

    showDocument();
  }

  function openHistoryDocument(entryId) {
    const entries = entryId ? [findHistoryEntry(entryId)].filter(Boolean) : state.history;

    if (!entries.length) {
      notify(t('noHistory'));
      return;
    }

    activeDocument = {
      type: 'history',
      title: 'Samruddhi History',
      html: buildHistoryHtml(entries)
    };

    showDocument();
    notify(t('historyPrinted'));
  }

  function showDocument() {
    els.printContent.innerHTML = activeDocument.html;
    els.printOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeDocument() {
    els.printOverlay.hidden = true;
    els.printContent.replaceChildren();
    document.body.style.overflow = '';
    activeDocument = null;
  }

  function downloadCurrentDocument() {
    saveGuestInputs();
    saveMealInputs();
    applyCurrentGeneratedDate();

    if (!els.printOverlay.hidden && activeDocument) {
      downloadActiveDocument();
      return;
    }

    if (getSelectedTotal()) {
      activeDocument = {
        type: 'menu',
        title: 'Samruddhi Menu',
        html: buildMenuHtml()
      };
      downloadActiveDocument();
      activeDocument = null;
      return;
    }

    if (getEstimateRows().length) {
      activeDocument = {
        type: 'estimate',
        title: 'Samruddhi Estimate',
        html: buildEstimateHtml()
      };
      downloadActiveDocument();
      activeDocument = null;
      return;
    }

    notify(t('downloadNeedsData'));
  }

  function downloadActiveDocument() {
    if (!activeDocument) {
      notify(t('generateFirst'));
      return;
    }

    const fileBase = [activeDocument.type, state.guest.name, state.guest.date]
      .filter(Boolean)
      .map(slugify)
      .filter(Boolean)
      .join('-') || 'samruddhi-document';

    const html = buildStandaloneDocument(activeDocument.title, activeDocument.html);
    downloadBlob(html, `${fileBase}.html`, 'text/html;charset=utf-8');
    notify(t('documentDownloaded'));
  }

  function buildMenuHtml() {
    const guest = getGuest();
    const sections = [
      buildDocHeader(t('menuDocTitle')),
      buildInfoBox(guest)
    ];

    Object.entries(state.db).forEach(([tabKey, tab]) => {
      if (!countTab(tabKey)) return;

      const mealInfo = state.mealInfo[tabKey] || {};
      const meta = [];
      const mealDate = formatDate(mealInfo.date || getTodayInputDate());
      const members = Number(mealInfo.members) || 0;
      const remark = String(mealInfo.remark || '').trim();
      if (mealDate) meta.push(mealDate);
      if (members) meta.push(`${formatNumber(members)} ${members === 1 ? t('person') : t('persons')}`);

      const categoryHtml = Object.entries(state.selected[tabKey] || {})
        .filter(([, items]) => items.length)
        .map(([category, items]) => `
          <div class="doc-category">${escapeHtml(displayLabel(category))}</div>
          <div class="doc-items">
            ${sortTextList(items).map((item) => `<div class="doc-item">${escapeHtml(displayItemLabel(item))}</div>`).join('')}
          </div>
        `)
        .join('');

      sections.push(`
        <section class="doc-meal">
          <div class="doc-meal-head">
            <div class="doc-meal-name">${escapeHtml(`${tab.icon || ''} ${displayLabel(tab.name || tabKey)}`.trim())}</div>
            ${meta.map((entry) => `<div class="doc-meal-meta">${escapeHtml(entry)}</div>`).join('')}
          </div>
          ${remark ? `<div class="doc-remark"><strong>${escapeHtml(t('remark'))}:</strong> ${escapeHtml(remark)}</div>` : ''}
          ${categoryHtml}
        </section>
      `);
    });

    sections.push(`<div class="doc-credit">${escapeHtml(t('creditText') || CREDIT_TEXT)}</div>`);
    return sections.join('');
  }

  function buildEstimateHtml() {
    const guest = getGuest();
    const rows = getEstimateRows();
    const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);

    const tableRows = rows.map((row) => `
      <tr>
        <td>${escapeHtml(row.date || '-')}</td>
        <td>${escapeHtml(row.label)}</td>
        <td>${escapeHtml(row.remark || '-')}</td>
        <td class="right">${formatNumber(row.members)}</td>
        <td class="right">${formatCurrency(row.price)}</td>
        <td class="right">${formatCurrency(row.total)}</td>
      </tr>
    `).join('');

    return `
      ${buildDocHeader(t('estimateQuotation'))}
      ${buildInfoBox(guest)}
      <table class="estimate-table">
        <thead>
          <tr>
            <th>${escapeHtml(t('date'))}</th>
            <th>${escapeHtml(t('functionMeal'))}</th>
            <th>${escapeHtml(t('remark'))}</th>
            <th class="right">${escapeHtml(t('persons'))}</th>
            <th class="right">${escapeHtml(t('ratePlate'))}</th>
            <th class="right">${escapeHtml(t('amount'))}</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
          <tr class="total-row">
            <td colspan="5">${escapeHtml(t('grandTotal'))}</td>
            <td class="right">${formatCurrency(grandTotal)}</td>
          </tr>
        </tbody>
      </table>
      ${buildQuotationTermsHtml()}
      <div class="doc-signatures">
        <div class="signature-box"><div class="signature-line">${escapeHtml(t('clientSignature'))}</div></div>
        <div class="signature-box"><div class="signature-line">${escapeHtml(t('catererSignature'))}</div></div>
      </div>
      <div class="doc-note">${escapeHtml(t('estimateNote'))}</div>
      <div class="doc-credit">${escapeHtml(t('creditText') || CREDIT_TEXT)}</div>
    `;
  }

  function buildEstimateSelectedItems() {
    if (!getSelectedTotal()) return '';

    const rows = Object.entries(state.db).map(([tabKey, tab]) => {
      if (!countTab(tabKey)) return '';

      const allItems = Object.values(state.selected[tabKey] || {}).flat();
      if (!allItems.length) return '';

      const mealDate = formatDate(state.mealInfo[tabKey]?.date || getTodayInputDate());
      const label = `${tab.icon || ''} ${displayLabel(tab.name || tabKey)}${mealDate ? ` (${mealDate})` : ''}`.trim();
      return `
        <div class="estimate-item-row">
          <strong>${escapeHtml(label)}</strong>
          <div class="estimate-list">${allItems.map((item) => escapeHtml(displayItemLabel(item))).join(' &bull; ')}</div>
        </div>
      `;
    }).join('');

    return `
      <section class="estimate-items">
        <div class="estimate-items-title">${escapeHtml(t('selectedMenuItems'))}</div>
        ${rows}
      </section>
    `;
  }

  function buildQuotationTermsHtml() {
    return `
      <section class="quotation-terms">
        <h3>${escapeHtml(t('termsConditions'))}</h3>
        <ol>
          ${QUOTATION_TERMS_HI.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}
        </ol>
      </section>
    `;
  }

  function buildHistoryHtml(entries) {
    return `
      ${buildDocHeader(t('historyDocTitle'))}
      ${entries.map(buildHistoryEntryHtml).join('')}
      <div class="doc-credit">${escapeHtml(t('creditText') || CREDIT_TEXT)}</div>
    `;
  }

  function buildHistoryEntryHtml(entry) {
    const guest = {
      name: entry.guest?.name || '-',
      venue: entry.guest?.venue || '-',
      date: formatDate(entry.guest?.date),
      contact: entry.guest?.contact || '-'
    };

    const estimateRows = (entry.estimateRows || []).map((row) => `
      <tr>
        <td>${escapeHtml(formatDate(row.dateRaw || entry.guest?.date || getTodayInputDate()))}</td>
        <td>${escapeHtml(`${row.icon || ''} ${displayLabel(row.tabName || row.label)}`.trim())}</td>
        <td>${escapeHtml(row.remark || '-')}</td>
        <td class="right">${formatNumber(row.members)}</td>
        <td class="right">${formatCurrency(row.price)}</td>
        <td class="right">${formatCurrency(row.total)}</td>
      </tr>
    `).join('');

    const selectedSections = (entry.selectedSections || []).map((section) => `
      <section class="doc-meal">
        <div class="doc-meal-head">
          <div class="doc-meal-name">${escapeHtml(`${section.icon || ''} ${displayLabel(section.tabName || section.tabKey)}`.trim())}</div>
        </div>
        ${section.remark ? `<div class="doc-remark"><strong>${escapeHtml(t('remark'))}:</strong> ${escapeHtml(section.remark)}</div>` : ''}
        ${(section.categories || []).map((category) => `
          <div class="doc-category">${escapeHtml(displayLabel(category.name))}</div>
          <div class="doc-items">
            ${sortTextList(category.items || []).map((item) => `<div class="doc-item">${escapeHtml(displayHistoryItemLabel(item, entry))}</div>`).join('')}
          </div>
        `).join('')}
      </section>
    `).join('');

    return `
      <section class="history-entry">
        <div class="history-entry-head">
          <div>
            <div class="history-entry-title">${escapeHtml(entry.guest?.name || t('untitledEvent'))}</div>
            <div>${escapeHtml(guest.venue)} · ${escapeHtml(guest.date)} · ${escapeHtml(guest.contact)}</div>
          </div>
          <div class="history-entry-meta">${escapeHtml(t('savedOn'))}<br>${escapeHtml(formatDateTime(entry.savedAt))}</div>
        </div>
        ${buildInfoBox(guest)}
        ${estimateRows ? `
          <table class="estimate-table">
            <thead>
              <tr>
                <th>${escapeHtml(t('date'))}</th>
                <th>${escapeHtml(t('functionMeal'))}</th>
                <th>${escapeHtml(t('remark'))}</th>
                <th class="right">${escapeHtml(t('persons'))}</th>
                <th class="right">${escapeHtml(t('ratePlate'))}</th>
                <th class="right">${escapeHtml(t('amount'))}</th>
              </tr>
            </thead>
            <tbody>
              ${estimateRows}
              <tr class="total-row">
                <td colspan="5">${escapeHtml(t('grandTotal'))}</td>
                <td class="right">${formatCurrency(entry.estimateTotal || 0)}</td>
              </tr>
            </tbody>
          </table>
        ` : ''}
        ${selectedSections}
      </section>
    `;
  }

  function buildDocHeader(title) {
    return `
      <header class="doc-header">
        <img class="doc-logo" src="${escapeHtml(DOCUMENT_LOGO_SRC)}" alt="Samruddhi Event's & Caterers">
        <h2>${escapeHtml(title)}</h2>
      </header>
    `;
  }

  function buildInfoBox(guest) {
    return `
      <section class="doc-info">
        <div class="doc-info-cell wide">
          <span class="label">${escapeHtml(t('functionGuest'))}</span>
          <span class="value">${escapeHtml(guest.name)}</span>
        </div>
        <div class="doc-info-cell">
          <span class="label">${escapeHtml(t('date'))}</span>
          <span class="value">${escapeHtml(guest.date)}</span>
        </div>
        <div class="doc-info-cell wide">
          <span class="label">${escapeHtml(t('venue'))}</span>
          <span class="value">${escapeHtml(guest.venue)}</span>
        </div>
        <div class="doc-info-cell">
          <span class="label">${escapeHtml(t('contact'))}</span>
          <span class="value">${escapeHtml(guest.contact)}</span>
        </div>
      </section>
    `;
  }

  function buildStandaloneDocument(title, bodyHtml) {
    return `<!DOCTYPE html>
<html lang="${getLang() === 'hi' ? 'hi' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>${DOCUMENT_STYLES}</style>
</head>
<body>
  <main class="print-sheet">${bodyHtml}</main>
</body>
</html>`;
  }

  function getEstimateRows() {
    return getEstimateRowsRaw().map((row) => ({
      ...row,
      label: `${row.icon || ''} ${displayLabel(row.tabName || row.label)}`.trim(),
      date: formatDate(row.dateRaw)
    }));
  }

  function getEstimateRowsRaw() {
    return Object.entries(state.db).reduce((rows, [tabKey, tab]) => {
      const info = state.mealInfo[tabKey] || {};
      const members = Number(info.members) || 0;
      const price = Number(info.price) || 0;

      if (members > 0 && price > 0) {
        rows.push({
          tabKey,
          tabName: tab.name || tabKey,
          icon: tab.icon || '',
          label: tab.name || tabKey,
          dateRaw: info.date || getTodayInputDate(),
          remark: String(info.remark || '').trim(),
          members,
          price,
          total: members * price
        });
      }

      return rows;
    }, []);
  }

  function getGuest() {
    return {
      name: state.guest.name || '-',
      venue: state.guest.venue || '-',
      date: formatDate(state.guest.date),
      contact: state.guest.contact || '-'
    };
  }

  function applyCurrentGeneratedDate() {
    const today = getTodayInputDate();
    if (!state.guest.date) {
      state.guest.date = today;
      els.eventDate.value = today;
    }

    Object.keys(state.db).forEach((tabKey) => {
      if (!state.mealInfo[tabKey]) state.mealInfo[tabKey] = createEmptyMealInfo();
      if (!state.mealInfo[tabKey].date) state.mealInfo[tabKey].date = today;
      state.mealInfo[tabKey].time = '';
    });

    if (state.mealInfo[state.currentTab]) {
      els.mealDate.value = state.mealInfo[state.currentTab].date || today;
    }

    persistState();
  }

  function supportsHubSync() {
    return location.protocol === 'http:' || location.protocol === 'https:';
  }

  async function initHubSync() {
    if (!supportsHubSync()) {
      renderSyncStatus(t('hubOffline'));
      return;
    }

    try {
      await pullHubState();
      openHubEvents();
      hubConnected = true;
      renderSyncStatus();
    } catch (error) {
      hubConnected = false;
      renderSyncStatus(t('hubOffline'));
    }
  }

  async function pullHubState() {
    const response = await fetch('/api/state', { cache: 'no-store' });
    if (response.status === 204) {
      await writeHubState({ silent: true });
      return;
    }
    if (!response.ok) throw new Error('Sync hub unavailable');

    const payload = await response.json();
    const incomingState = extractStateFromPayload(payload);
    if (incomingState && shouldLoadIncomingSync(incomingState)) {
      applyImportedState(incomingState, { notifyKey: 'syncLoaded', silent: true });
    } else {
      await writeHubState({ silent: true });
    }
  }

  function openHubEvents() {
    if (hubEventSource) hubEventSource.close();
    hubEventSource = new EventSource('/api/events');
    hubEventSource.addEventListener('state', (event) => {
      try {
        handleIncomingHubPayload(JSON.parse(event.data));
      } catch (error) {
        // Ignore malformed sync events.
      }
    });
    hubEventSource.onopen = () => {
      hubConnected = true;
      renderSyncStatus();
    };
    hubEventSource.onerror = () => {
      hubConnected = false;
      renderSyncStatus(t('hubOffline'));
    };
  }

  function handleIncomingHubPayload(payload) {
    const incomingState = extractStateFromPayload(payload);
    if (!incomingState || incomingState.updatedAt === state.updatedAt) return;
    if (!shouldLoadIncomingSync(incomingState)) return;

    applyImportedState(incomingState, { notifyKey: 'syncLoaded', silent: true });
    hubConnected = true;
    renderSyncStatus(t('syncLoaded'));
  }

  async function writeHubState(options = {}) {
    if (!supportsHubSync() || hubWriteInProgress) return;

    try {
      hubWriteInProgress = true;
      const response = await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildBackupPayload())
      });
      if (!response.ok) throw new Error('Sync hub write failed');
      hubConnected = true;
      if (!options.silent) renderSyncStatus(t('syncSaved'));
    } catch (error) {
      hubConnected = false;
      if (!options.silent) renderSyncStatus(t('hubOffline'));
    } finally {
      hubWriteInProgress = false;
    }
  }

  function openDeviceDialog() {
    if (els.deviceLink) {
      els.deviceLink.value = cloudSyncUrl || '';
    }
    if (els.deviceDialogStatus) {
      els.deviceDialogStatus.textContent = cloudSyncUrl ? t('cloudConnected') : t('cloudPairHelp');
    }

    if (typeof els.deviceDialog?.showModal === 'function') {
      els.deviceDialog.showModal();
    } else {
      els.deviceDialog?.setAttribute('open', '');
    }
  }

  function closeDeviceDialog() {
    if (!els.deviceDialog?.open) return;
    els.deviceDialog.close();
  }

  async function copyDeviceLink() {
    if (!cloudSyncUrl) {
      notify(t('cloudPairHelp'));
      return;
    }

    const link = getDeviceAddress({ includeSync: true });
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
    } catch (error) {
      const fallbackInput = document.createElement('textarea');
      fallbackInput.value = link;
      fallbackInput.setAttribute('readonly', '');
      fallbackInput.style.position = 'fixed';
      fallbackInput.style.opacity = '0';
      document.body.append(fallbackInput);
      fallbackInput.select();
      document.execCommand('copy');
      fallbackInput.remove();
    }

    notify(t('deviceLinkCopied'));
  }

  function getDeviceAddress(options = {}) {
    if (!supportsHubSync()) return '';

    const url = new URL(location.href);
    if (options.includeSync && cloudSyncUrl) {
      url.searchParams.set(CLOUD_SYNC_QUERY_PARAM, cloudSyncUrl);
    } else {
      url.searchParams.delete(CLOUD_SYNC_QUERY_PARAM);
    }
    return url.toString();
  }

  function initCloudSync() {
    const linkedSyncUrl = getLinkedCloudSyncUrl();
    cloudSyncUrl = linkedSyncUrl || normalizeCloudUrl(localStorage.getItem(CLOUD_SYNC_URL_KEY) || '');
    if (!cloudSyncUrl) {
      renderSyncStatus();
      return;
    }

    if (linkedSyncUrl) localStorage.setItem(CLOUD_SYNC_URL_KEY, cloudSyncUrl);
    startCloudSync({ silent: true }).catch(() => {
      renderSyncStatus(t('cloudPairError'));
    });
  }

  function getLinkedCloudSyncUrl() {
    if (!supportsHubSync()) return '';

    try {
      const url = new URL(location.href);
      return normalizeCloudUrl(url.searchParams.get(CLOUD_SYNC_QUERY_PARAM) || '');
    } catch (error) {
      return '';
    }
  }

  async function pairCloudDevice() {
    const url = normalizeCloudUrl(els.deviceLink?.value || '');
    if (!url) {
      notify(t('cloudPairError'));
      return;
    }

    cloudSyncUrl = url;
    localStorage.setItem(CLOUD_SYNC_URL_KEY, cloudSyncUrl);

    try {
      await startCloudSync({ silent: false });
      if (els.deviceDialogStatus) els.deviceDialogStatus.textContent = t('cloudPairSaved');
      notify(t('cloudPairSaved'));
    } catch (error) {
      notify(t('cloudPairError'));
    }
  }

  async function startCloudSync(options = {}) {
    clearInterval(cloudPollTimer);
    await pullCloudState();
    cloudPollTimer = setInterval(() => pullCloudState({ silent: true }), CLOUD_POLL_MS);
    renderSyncStatus(options.silent ? undefined : t('cloudConnected'));
  }

  async function pullCloudState() {
    if (!cloudSyncUrl) return;
    const payload = await fetchCloudPayload();
    const incomingState = extractStateFromPayload(payload);

    if (incomingState && shouldLoadIncomingSync(incomingState)) {
      applyImportedState(incomingState, { notifyKey: 'syncLoaded', silent: true });
    } else if (!incomingState || isNewer(state.updatedAt, incomingState.updatedAt)) {
      await writeCloudState({ silent: true });
    }
  }

  function fetchCloudPayload() {
    return new Promise((resolve, reject) => {
      const callbackName = `samruddhiCloudSync${Date.now()}${cloudRequestCounter += 1}`;
      const script = document.createElement('script');
      const cleanup = () => {
        delete window[callbackName];
        script.remove();
        clearTimeout(timer);
      };
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error('Cloud sync timed out'));
      }, 12000);

      window[callbackName] = (payload) => {
        cleanup();
        resolve(payload);
      };

      const url = new URL(cloudSyncUrl);
      url.searchParams.set('action', 'get');
      url.searchParams.set('callback', callbackName);
      url.searchParams.set('t', String(Date.now()));
      script.onerror = () => {
        cleanup();
        reject(new Error('Cloud sync failed'));
      };
      script.src = url.toString();
      document.head.append(script);
    });
  }

  async function writeCloudState(options = {}) {
    if (!cloudSyncUrl || cloudWriteInProgress) return;

    try {
      cloudWriteInProgress = true;
      await fetch(cloudSyncUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(buildBackupPayload())
      });
      if (!options.silent) renderSyncStatus(t('cloudSynced'));
    } catch (error) {
      if (!options.silent) notify(t('cloudPairError'));
    } finally {
      cloudWriteInProgress = false;
    }
  }

  function normalizeCloudUrl(value) {
    const url = String(value || '').trim();
    if (!url) return '';

    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : '';
    } catch (error) {
      return '';
    }
  }

  async function connectSyncFile() {
    if (!supportsFileSync()) {
      notify(t('syncUnsupported'));
      return;
    }

    try {
      syncFileHandle = await pickSyncFileHandle();
      await storeSyncFileHandle(syncFileHandle);
      startSyncPolling();
      await reconcileSyncFileOnConnect({ silent: false });
      renderSyncStatus(t('syncConnected'));
      notify(t('syncConnected'));
    } catch (error) {
      if (!isAbortError(error)) {
        notify(t('syncError'));
      }
    }
  }

  async function pickSyncFileHandle() {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: 'Samruddhi Sync', accept: { 'application/json': ['.json'] } }],
        multiple: false
      });
      return handle;
    } catch (error) {
      if (!isAbortError(error)) throw error;
      return window.showSaveFilePicker({
        suggestedName: SYNC_FILE_NAME,
        types: [{ description: 'Samruddhi Sync', accept: { 'application/json': ['.json'] } }]
      });
    }
  }

  async function restoreSyncFileHandle() {
    if (!supportsFileSync() || !window.indexedDB) return;

    try {
      const handle = await getStoredSyncFileHandle();
      if (!handle) return;

      if ((await getFilePermissionState(handle, 'readwrite')) !== 'granted') {
        renderSyncStatus(t('syncPermissionNeeded'));
        return;
      }

      syncFileHandle = handle;
      startSyncPolling();
      await reconcileSyncFileOnConnect({ silent: true });
      renderSyncStatus(t('syncAutoReady'));
    } catch (error) {
      // Auto-restore should stay quiet; the Connect button can recover manually.
    }
  }

  async function reconcileSyncFileOnConnect(options = {}) {
    if (!syncFileHandle) return;

    try {
      const file = await syncFileHandle.getFile();
      syncFileLastModified = file.lastModified;

      if (!file.size) {
        await writeSyncFile({ silent: true });
        return;
      }

      const incomingState = extractStateFromPayload(JSON.parse(await file.text()));
      if (incomingState && shouldLoadIncomingSync(incomingState)) {
        applyImportedState(incomingState, { notifyKey: 'syncLoaded', silent: options.silent });
      } else {
        await writeSyncFile({ silent: true });
      }
    } catch (error) {
      if (!options.silent) notify(t('syncError'));
    }
  }

  function shouldLoadIncomingSync(incomingState) {
    if (!incomingState) return false;
    if (!hasMeaningfulStateData(incomingState)) return false;
    if (!hasLocalSyncData()) return true;
    return isNewer(incomingState.updatedAt, state.updatedAt);
  }

  function hasLocalSyncData() {
    return hasMeaningfulStateData(state);
  }

  function hasMeaningfulStateData(candidateState) {
    const guest = candidateState?.guest || {};
    const mealInfo = candidateState?.mealInfo || {};
    const selected = candidateState?.selected || {};

    return Boolean(
      Object.values(guest).some(Boolean) ||
      Object.keys(candidateState?.itemHindiNames || {}).length ||
      Array.isArray(candidateState?.history) && candidateState.history.length ||
      Object.values(mealInfo).some((info) => info?.members || info?.price || info?.remark) ||
      Object.values(selected).some((tabSelection) =>
        Object.values(tabSelection || {}).some((items) => Array.isArray(items) && items.length)
      ) ||
      hasCatalogChanges(candidateState?.db)
    );
  }

  function hasCatalogChanges(candidateDb = state.db) {
    const defaultKeys = Object.keys(DEFAULT_DB || {});
    const stateKeys = Object.keys(candidateDb || {});
    if (defaultKeys.length !== stateKeys.length) return true;

    return defaultKeys.some((tabKey) => {
      const defaultTab = DEFAULT_DB[tabKey];
      const stateTab = candidateDb[tabKey];
      if (!stateTab) return true;
      if ((defaultTab?.name || tabKey) !== (stateTab.name || tabKey)) return true;

      const defaultCats = defaultTab?.cats || {};
      const stateCats = stateTab.cats || {};
      const defaultCatNames = Object.keys(defaultCats);
      const stateCatNames = Object.keys(stateCats);
      if (defaultCatNames.length !== stateCatNames.length) return true;

      return defaultCatNames.some((category) => {
        if (!Array.isArray(stateCats[category])) return true;
        return sortTextList(defaultCats[category]).join('\n') !== sortTextList(stateCats[category]).join('\n');
      });
    });
  }

  async function loadFromSyncFile(options = {}) {
    if (!syncFileHandle) {
      notify(t('syncNeedsConnect'));
      return;
    }

    try {
      if (!(await verifyFilePermission(syncFileHandle, 'read'))) {
        notify(t('syncError'));
        return;
      }

      const file = await syncFileHandle.getFile();
      const text = await file.text();
      const incomingState = extractStateFromPayload(JSON.parse(text));
      if (!incomingState) {
        notify(t('importInvalid'));
        return;
      }

      if (options.confirmReplace && !window.confirm(t('syncReplaceConfirm'))) return;

      syncFileLastModified = file.lastModified;
      applyImportedState(incomingState, { notifyKey: 'syncLoaded', silent: options.silent });
    } catch (error) {
      if (!isAbortError(error)) notify(t('syncError'));
    }
  }

  async function saveToSyncFile() {
    if (!syncFileHandle) {
      notify(t('syncNeedsConnect'));
      return;
    }

    await writeSyncFile({ silent: false });
  }

  function scheduleSyncWrite() {
    if (syncFileHandle) {
      clearTimeout(syncSaveTimer);
      syncSaveTimer = setTimeout(() => {
        writeSyncFile({ silent: true });
      }, 900);
    }

    if (hubConnected) {
      clearTimeout(hubSaveTimer);
      hubSaveTimer = setTimeout(() => {
        writeHubState({ silent: true });
      }, 500);
    }

    if (cloudSyncUrl) {
      clearTimeout(cloudSaveTimer);
      cloudSaveTimer = setTimeout(() => {
        writeCloudState({ silent: true });
      }, 650);
    }
  }

  async function writeSyncFile(options = {}) {
    if (!syncFileHandle || syncWriteInProgress) return;

    try {
      syncWriteInProgress = true;

      if (!(await verifyFilePermission(syncFileHandle, 'readwrite'))) {
        notify(t('syncError'));
        return;
      }

      const writable = await syncFileHandle.createWritable();
      await writable.write(JSON.stringify(buildBackupPayload(), null, 2));
      await writable.close();

      const file = await syncFileHandle.getFile();
      syncFileLastModified = file.lastModified;
      renderSyncStatus(t('syncSaved'));
      if (!options.silent) notify(t('syncSaved'));
    } catch (error) {
      if (!isAbortError(error)) notify(t('syncError'));
    } finally {
      syncWriteInProgress = false;
    }
  }

  function startSyncPolling() {
    clearInterval(syncPollTimer);
    syncPollTimer = setInterval(checkSyncFileUpdates, SYNC_POLL_MS);
  }

  async function checkSyncFileUpdates() {
    if (!syncFileHandle || syncWriteInProgress) return;

    try {
      const file = await syncFileHandle.getFile();
      if (!syncFileLastModified || file.lastModified <= syncFileLastModified) return;

      const incomingState = extractStateFromPayload(JSON.parse(await file.text()));
      syncFileLastModified = file.lastModified;

      if (!incomingState) return;
      if (isNewer(incomingState.updatedAt, state.updatedAt)) {
        applyImportedState(incomingState, { notifyKey: 'syncLoaded', silent: true });
        renderSyncStatus(t('syncLoaded'));
      }
    } catch (error) {
      // Background polling should stay quiet unless the user explicitly syncs.
    }
  }

  function exportBackup() {
    saveGuestInputs();
    saveMealInputs();
    const filename = `samruddhi-backup-${formatFileStamp(new Date())}.json`;
    downloadBlob(JSON.stringify(buildBackupPayload(), null, 2), filename, 'application/json;charset=utf-8');
    notify(t('backupExported'));
  }

  async function importBackupFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const incomingState = extractStateFromPayload(JSON.parse(await file.text()));
      if (!incomingState) {
        notify(t('importInvalid'));
        return;
      }

      if (!window.confirm(t('syncReplaceConfirm'))) return;
      applyImportedState(incomingState, { notifyKey: 'backupImported' });
    } catch (error) {
      notify(t('importInvalid'));
    } finally {
      event.target.value = '';
    }
  }

  function buildBackupPayload() {
    saveGuestInputs();
    saveMealInputs();
    return {
      app: APP_ID,
      version: 3,
      exportedAt: new Date().toISOString(),
      state
    };
  }

  function extractStateFromPayload(payload) {
    if (!payload || typeof payload !== 'object') return null;
    const candidate = payload.state && typeof payload.state === 'object' ? payload.state : payload;
    return isPlainObject(candidate.db) ? candidate : null;
  }

  function applyImportedState(importedState, options = {}) {
    state = mergeState(createBaseState(), importedState);
    ensureStateShape();
    syncInputsFromState();
    renderAll();
    persistState({ touch: false, sync: false });
    renderSyncStatus(t(options.notifyKey || 'backupImported'));
    if (!options.silent) notify(t(options.notifyKey || 'backupImported'));
  }

  function supportsFileSync() {
    return typeof window.showOpenFilePicker === 'function' && typeof window.showSaveFilePicker === 'function';
  }

  async function storeSyncFileHandle(handle) {
    if (!window.indexedDB || !handle) return;
    let db = null;
    try {
      db = await openSyncHandleDb();
      await new Promise((resolve, reject) => {
        const transaction = db.transaction(SYNC_DB_STORE, 'readwrite');
        transaction.objectStore(SYNC_DB_STORE).put(handle, SYNC_HANDLE_KEY);
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      // The active session can still sync even if handle persistence is unavailable.
    } finally {
      if (db) db.close();
    }
  }

  async function getStoredSyncFileHandle() {
    const db = await openSyncHandleDb();
    const handle = await new Promise((resolve, reject) => {
      const request = db.transaction(SYNC_DB_STORE, 'readonly').objectStore(SYNC_DB_STORE).get(SYNC_HANDLE_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return handle;
  }

  function openSyncHandleDb() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(SYNC_DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(SYNC_DB_STORE)) db.createObjectStore(SYNC_DB_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function getFilePermissionState(handle, mode) {
    if (!handle.queryPermission) return 'granted';
    return handle.queryPermission({ mode });
  }

  async function verifyFilePermission(handle, mode) {
    if (!handle.queryPermission || !handle.requestPermission) return true;
    const options = { mode };
    if ((await handle.queryPermission(options)) === 'granted') return true;
    return (await handle.requestPermission(options)) === 'granted';
  }

  function countTab(tabKey) {
    return Object.values(state.selected[tabKey] || {}).reduce((sum, items) => sum + items.length, 0);
  }

  function getSelectedTotal() {
    return Object.keys(state.db).reduce((sum, tabKey) => sum + countTab(tabKey), 0);
  }

  function hasHistoryWorthyData() {
    return Boolean(
      getSelectedTotal() ||
      getEstimateRows().length ||
      state.guest.name ||
      state.guest.venue ||
      state.guest.date ||
      state.guest.contact
    );
  }

  function isSelected(tabKey, category, item) {
    return state.selected[tabKey]?.[category]?.includes(item) || false;
  }

  function ensureSelectionArray(tabKey, category) {
    if (!state.selected[tabKey]) state.selected[tabKey] = {};
    if (!Array.isArray(state.selected[tabKey][category])) state.selected[tabKey][category] = [];
    return state.selected[tabKey][category];
  }

  function getCurrentTab() {
    return state.db[state.currentTab];
  }

  function isCustomTab(tabKey) {
    return tabKey?.startsWith(CUSTOM_TAB_PREFIX) || tabKey?.startsWith('ctab_');
  }

  function createCustomTabKey(name) {
    const base = `${CUSTOM_TAB_PREFIX}${slugify(name) || 'heading'}`;
    let key = base;
    let counter = 1;

    while (state.db[key]) {
      key = `${base}_${counter}`;
      counter += 1;
    }

    return key;
  }

  function findCategoryKey(tab, name) {
    const wanted = normalize(name);
    return Object.keys(tab?.cats || {}).find((category) => normalize(category) === wanted) || '';
  }

  function parseBulkItems(value) {
    return uniqueTextList(String(value || '').split(/[\n,;]+/));
  }

  function parseBulkItemRows(itemValue, hindiValue) {
    const hindiNames = splitBulkValues(hindiValue);
    return splitBulkValues(itemValue).map((name, index) => ({
      name,
      hindiName: hindiNames[index] || ''
    }));
  }

  function splitBulkValues(value) {
    return String(value || '')
      .split(/[\n,;]+/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  function uniqueItemEntries(entries) {
    const seen = new Set();
    const result = [];

    (entries || []).forEach((entry) => {
      const item = typeof entry === 'string' ? { name: entry, hindiName: '' } : entry;
      const name = String(item?.name || '').trim();
      const key = normalize(name);
      if (!name || seen.has(key)) return;
      seen.add(key);
      result.push({ name, hindiName: String(item?.hindiName || '').trim() });
    });

    return result;
  }

  function uniqueTextList(items) {
    const seen = new Set();
    const result = [];

    (items || []).forEach((item) => {
      const cleaned = String(item || '').trim();
      const key = normalize(cleaned);
      if (!cleaned || seen.has(key)) return;
      seen.add(key);
      result.push(cleaned);
    });

    return result;
  }

  function sortTextList(items) {
    return (items || []).slice().sort(compareText);
  }

  function compareText(a, b) {
    return String(a || '').localeCompare(String(b || ''), 'en', { sensitivity: 'base' });
  }

  function mergeTextList(target, source) {
    const existing = new Set((target || []).map(normalize));
    (source || []).forEach((item) => {
      const cleaned = String(item || '').trim();
      if (!cleaned || existing.has(normalize(cleaned))) return;
      target.push(cleaned);
      existing.add(normalize(cleaned));
    });
  }

  function matchesSearch(value, query) {
    if (!query) return true;
    return normalize(value).includes(query) ||
      normalize(displayLabel(value)).includes(query) ||
      normalize(displayItemLabel(value)).includes(query);
  }

  function displayLabel(value) {
    const text = String(value || '');
    return getLang() === 'hi' ? (DATA_LABELS_HI[text] || text) : text;
  }

  function displayItemLabel(value) {
    const text = String(value || '');
    if (getLang() !== 'hi') return text;
    return getStoredItemHindiName(text) || buildHindiItemFallback(text);
  }

  function displayHistoryItemLabel(value, entry) {
    const text = String(value || '');
    if (getLang() !== 'hi') return text;
    return entry?.itemHindiNames?.[itemKey(text)] || getStoredItemHindiName(text) || buildHindiItemFallback(text);
  }

  function getStoredItemHindiName(item) {
    return state.itemHindiNames?.[itemKey(item)] || '';
  }

  function saveItemHindiName(item, hindiName) {
    if (!state.itemHindiNames) state.itemHindiNames = {};
    const key = itemKey(item);
    const value = String(hindiName || '').trim();
    if (value) {
      state.itemHindiNames[key] = value;
    } else {
      delete state.itemHindiNames[key];
    }
  }

  function moveItemHindiName(oldItem, newItem) {
    if (!state.itemHindiNames) state.itemHindiNames = {};
    const oldKey = itemKey(oldItem);
    const newKey = itemKey(newItem);
    if (oldKey === newKey) return;
    if (state.itemHindiNames[oldKey] && !state.itemHindiNames[newKey]) {
      state.itemHindiNames[newKey] = state.itemHindiNames[oldKey];
    }
    delete state.itemHindiNames[oldKey];
  }

  function itemKey(item) {
    return normalize(item);
  }

  function buildHindiItemFallback(item) {
    return String(item || '').replace(/[A-Za-z]+/g, (word) => {
      const direct = ITEM_WORDS_HI[word] || ITEM_WORDS_HI[word.toLowerCase()];
      return direct || transliterateRomanWord(word);
    });
  }

  function transliterateRomanWord(word) {
    const letters = {
      a: 'अ',
      b: 'ब',
      c: 'क',
      d: 'द',
      e: 'ए',
      f: 'फ',
      g: 'ग',
      h: 'ह',
      i: 'इ',
      j: 'ज',
      k: 'क',
      l: 'ल',
      m: 'म',
      n: 'न',
      o: 'ओ',
      p: 'प',
      q: 'क',
      r: 'र',
      s: 'स',
      t: 'ट',
      u: 'उ',
      v: 'व',
      w: 'व',
      x: 'क्स',
      y: 'य',
      z: 'ज'
    };

    return String(word || '')
      .toLowerCase()
      .split('')
      .map((char) => letters[char] || char)
      .join('');
  }

  function itemCount(count) {
    return `${count} ${count === 1 ? t('item') : t('items')}`;
  }

  function buildEmptyState(title, message) {
    const node = createNode('div', { className: 'empty-state' });
    node.append(
      createNode('div', {
        html: `<strong>${escapeHtml(title)}</strong>${message ? `<span>${escapeHtml(message)}</span>` : ''}`
      })
    );
    return node;
  }

  function notify(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.hidden = false;
    toastTimer = setTimeout(() => {
      els.toast.hidden = true;
    }, 2400);
  }

  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    const url = anchor.href;
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function createNode(tagName, options = {}) {
    const node = document.createElement(tagName);

    if (options.className) node.className = options.className;
    if (options.text !== undefined) node.textContent = options.text;
    if (options.html !== undefined) node.innerHTML = options.html;
    if (options.dataset) {
      Object.entries(options.dataset).forEach(([key, value]) => {
        node.dataset[key] = value;
      });
    }
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        node.setAttribute(key, value);
      });
    }
    if (options.type) node.setAttribute('type', options.type);
    if (options.role) node.setAttribute('role', options.role);
    if (options.id) node.id = options.id;

    return node;
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  function deepClone(value) {
    if (window.structuredClone) return window.structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function slugify(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function t(key, values = {}) {
    const dictionary = I18N[getLang()] || I18N.en;
    let text = dictionary[key] || I18N.en[key] || key;

    Object.entries(values).forEach(([name, value]) => {
      text = text.split(`{${name}}`).join(String(value));
    });

    return text;
  }

  function getLang() {
    return state?.lang === 'hi' ? 'hi' : 'en';
  }

  function formatNumber(value) {
    return Number(value).toLocaleString(getLang() === 'hi' ? 'hi-IN' : 'en-IN', { maximumFractionDigits: 2 });
  }

  function formatCurrency(value) {
    return `₹ ${formatNumber(value)}`;
  }

  function formatDate(value) {
    if (!value) return '-';
    const parts = String(value).split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : value;
  }

  function getTodayInputDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }

  function formatDateTime(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleString(getLang() === 'hi' ? 'hi-IN' : 'en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function formatFileStamp(date) {
    const pad = (value) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;
  }

  function formatTime(value) {
    if (!value) return '';
    const [hourText, minuteText] = value.split(':');
    const rawHour = Number(hourText);
    if (!Number.isFinite(rawHour) || minuteText === undefined) return value;
    const suffix = rawHour >= 12 ? 'PM' : 'AM';
    const hour = rawHour % 12 || 12;
    return `${hour}:${minuteText} ${suffix}`;
  }

  function isNewer(candidate, current) {
    const candidateTime = Date.parse(candidate || '');
    const currentTime = Date.parse(current || '');
    return Number.isFinite(candidateTime) && (!Number.isFinite(currentTime) || candidateTime > currentTime);
  }

  function isAbortError(error) {
    return error?.name === 'AbortError';
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  const DOCUMENT_STYLES = `
    *{box-sizing:border-box}
    body{margin:0;background:#f6f7f9;color:#17202a;font-family:Arial,"Nirmala UI",sans-serif;font-size:15px;line-height:1.55}
    .print-sheet{width:min(980px,100%);margin:0 auto;background:#fff;padding:28px}
    .doc-header{text-align:center;padding-bottom:13px;margin-bottom:14px;border-bottom:3px double #c58b1d}
    .doc-logo{display:block;width:min(600px,100%);height:auto;margin:0 auto 8px}
    .doc-header h1{margin:0;color:#111827;font-size:2rem;font-weight:900;letter-spacing:0}
    .doc-header p{margin:2px 0 0;color:#64748b;font-size:.68rem;font-weight:800;text-transform:uppercase}
    .doc-header h2{display:inline-flex;margin:8px 0 0;border:1px solid #0f5132;border-radius:6px;padding:4px 16px;color:#0f5132;font-size:1rem;text-transform:uppercase}
    .doc-info{display:grid;grid-template-columns:repeat(3,1fr);border:2px solid #c58b1d;border-radius:8px;overflow:hidden;margin-bottom:18px}
    .doc-info-cell{padding:9px 12px;border-right:1px solid #d9e0e8;border-bottom:1px solid #d9e0e8}
    .doc-info-cell:nth-child(3n){border-right:none}.doc-info-cell.wide{grid-column:span 2}
    .label{display:block;margin-bottom:2px;color:#c58b1d;font-size:.62rem;font-weight:900;text-transform:uppercase}.value{display:block;color:#17202a;font-weight:900;overflow-wrap:anywhere}
    .doc-meal{margin-bottom:18px;page-break-inside:avoid}.doc-meal-head{display:flex;align-items:stretch;overflow:hidden;border-radius:6px;margin-bottom:9px}
    .doc-meal-name{flex:1;background:#111827;color:#f8d36f;padding:8px 12px;font-weight:900;text-transform:uppercase}.doc-meal-meta{display:inline-flex;align-items:center;background:#c58b1d;color:#111827;padding:8px 10px;font-weight:900;white-space:nowrap}
    .doc-category{margin:8px 0 4px;color:#c58b1d;font-size:.78rem;font-weight:900;text-transform:uppercase;border-bottom:1px solid #edf1f5}
    .doc-items{display:grid;grid-template-columns:repeat(4,1fr);gap:2px 12px}.doc-item{padding:2px 0;border-bottom:1px dotted #d8dee6;font-size:.9rem}.doc-item:before{content:"• ";color:#c58b1d}
    .doc-remark{margin:8px 0 10px;border:1px solid #edf1f5;border-left:4px solid #c58b1d;border-radius:6px;padding:8px 10px;background:#f9fafb;color:#334155;font-size:.92rem}
    .estimate-table{width:100%;border-collapse:collapse;margin-bottom:16px;font-size:.94rem}.estimate-table th{background:#111827;color:#f8d36f;padding:9px 10px;text-align:left;text-transform:uppercase;font-size:.76rem}.estimate-table td{padding:9px 10px;border-bottom:1px solid #edf1f5}.estimate-table tr:nth-child(even) td{background:#f9fafb}.right{text-align:right}.total-row td{background:#c58b1d!important;color:#111827;font-weight:900}
    .estimate-items{margin-top:12px}.estimate-items-title{margin-bottom:8px;color:#64748b;font-size:.74rem;font-weight:900;text-transform:uppercase;border-bottom:1px solid #edf1f5}.estimate-item-row{margin-bottom:8px}.estimate-item-row strong{display:block;margin-bottom:2px}.estimate-list{color:#475569;font-size:.88rem;line-height:1.7}
    .quotation-terms{margin-top:16px;padding:12px 14px;border:1px solid #ead7a8;border-radius:8px;background:#fffaf0;color:#17202a;page-break-inside:avoid}.quotation-terms h3{margin:0 0 8px;color:#0f5132;font-size:1rem}.quotation-terms ol{margin:0;padding-left:22px}.quotation-terms li{margin:5px 0}
    .doc-signatures{display:flex;justify-content:space-between;gap:18px;margin-top:30px;padding-top:12px;border-top:1px solid #edf1f5}.signature-box{width:210px;text-align:center}.signature-line{margin-top:38px;padding-top:5px;border-top:1px solid #17202a;color:#64748b;font-size:.75rem;font-weight:800}
    .doc-note,.doc-credit{color:#64748b;text-align:center;font-size:.72rem}.doc-note{margin-top:12px;padding-top:10px;border-top:1px solid #edf1f5}.doc-credit{margin-top:10px;font-weight:900}
    .history-entry{margin-bottom:18px;page-break-inside:avoid}.history-entry-head{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #edf1f5;padding-bottom:8px;margin-bottom:8px}.history-entry-title{font-weight:900}.history-entry-meta{color:#64748b;font-size:.78rem;font-weight:800;text-align:right}
    @media(max-width:720px){.print-sheet{padding:16px}.doc-info,.doc-items{grid-template-columns:1fr}.doc-info-cell,.doc-info-cell:nth-child(3n){border-right:none}.doc-info-cell.wide{grid-column:span 1}.doc-meal-head,.doc-signatures,.history-entry-head{flex-direction:column}.signature-box{width:100%}.history-entry-meta{text-align:left}}
  `;
})();
