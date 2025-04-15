//once a page is viewed after laoding, if that page is viewed again then view doesnt log as an event
// that is for eg if i load a page at 20.19 and view all the pages one by one i.e. scroll to the bottomest
// of the website and now if i scroll up again and view those pages again, the view event doesnt log this time
// (that is the second time). For the view event to log for any page again you'll need to load the sit again

document.addEventListener('DOMContentLoaded', function() {
  logEvent('view', document.title || 'page');
  
  document.addEventListener('click', function(event) {
    const target = event.target;
    let objectType = getElementType(target);
    logEvent('click', objectType);
  });
  
  setupViewportTracking();
});

function getElementType(element) {
  if (element.tagName === 'A') return 'link';
  if (element.tagName === 'BUTTON') return 'button';
  if (element.tagName === 'IMG') return 'image';
  if (element.tagName === 'INPUT') {
    if (element.type === 'button' || element.type === 'submit') return 'button';
    return `${element.type} input`;
  }
  if (element.tagName === 'SELECT') return 'drop-down';
  if (element.tagName === 'TEXTAREA') return 'text area';
  
  if (element.classList.contains('carousel')) return 'carousel';
  if (element.classList.contains('modal')) return 'modal';
  if (element.getAttribute('role') === 'tab') return 'tab';
  
  let parent = element.parentElement;
  while (parent) {
    if (parent.tagName === 'BUTTON') return 'button container';
    if (parent.tagName === 'A') return 'link container';
    if (parent.classList.contains('dropdown')) return 'drop-down item';
    if (parent.classList.contains('nav-item')) return 'navigation item';
    parent = parent.parentElement;
  }
  
  if (element.textContent && element.textContent.trim().length > 0) {
    return 'text';
  }
  
  return `${element.tagName.toLowerCase()}`;
}

function logEvent(eventType, objectType) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}, ${eventType}, ${objectType}`);
}

function setupViewportTracking() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const objectType = getElementType(element);
        if (!element.hasAttribute('data-viewed')) {
          logEvent('view', objectType);
          element.setAttribute('data-viewed', 'true');
        }
      }
    });
  }, {
    threshold: 0.5
  });
  
  const trackableElements = document.querySelectorAll('a, button, img, .card, .feature, nav, .hero, section, article');
  trackableElements.forEach(element => {
    observer.observe(element);
  });
}

function trackCustomEvent(eventName, objectDetails) {
  logEvent(eventName, objectDetails);
}