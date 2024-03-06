import Tooltip from './action-tooltip.svelte';

export const tooltip = (element, props) => {
  let component = null;
  let title = element.getAttribute('title');
  let action = props?.action || element.getAttribute('action') || 'hover';
  const hideOnClickOutside = props?.hideOnClickOutside || element.getAttribute('hideOnClickOutside') || false;

  const detect = ({ target }) => {
    if (hideOnClickOutside && target && !target.classList.contains('tooltip')) {
      onHide();
    }
  };

  const config = {
    ...props,
    targetElement: element
  };

  if (config.hideOnClickOutside) {
    delete config.hideOnClickOutside;
  }

  if (title) {
    let handleTitle = config.handleTitle ?  config.handleTitle : 'ignore';

    //'ignore' | 'addTag' | 'remove' | 'remove-replace'
    switch (handleTitle) {
      // Remove it, but don't overide content 
      case 'remove':
        if (title)
          element.removeAttribute('title');  
      break; 

      case 'remove-replace':
        // Remove it, and overide content 
        if (title) {
          element.removeAttribute('title');
          config.content = title;
        }
      break; 

      // Add a title attribute and passed in 
      case 'addTag':
        if (config.titleTag)
          element.setAttribute('title', config.titleTag);
        else 
          element.setAttribute('title', 'attribute titleTag not set!');
      break; 

      default:
      break; 

    }
  }

  const onClick = () => {
    if (component) {
      if (
        !(action === 'click' && hideOnClickOutside)
      ) {
        onHide();
      }
    } else {
      onShow();
    }
  };

  const onShow = () => {
    if (!component) {
      component = new Tooltip({
        target: element,
        props: config
      });
    }
  };

  const onHide = () => {
    if (component) {
      component.$destroy();
      component = null;
    }
  };

  const addListeners = () => {
    if (element !== null) {
      removeListeners();

      if (action === 'click') {
        element.addEventListener('click', onClick);

        if (hideOnClickOutside) {
          document.addEventListener('click', detect, {
            passive: true,
            capture: true
          });
        }
      }

      if (action === 'hover') {
        element.addEventListener('mouseenter', onShow);
        element.addEventListener('mouseleave', onHide);
      }
    }
  };

  const removeListeners = () => {
    if (hideOnClickOutside) {
      document.removeEventListener('click', detect);
    }

    if (element !== null) {
      element.removeEventListener('click', onClick);
      element.removeEventListener('mouseenter', onShow);
      element.removeEventListener('mouseleave', onHide);
    }
  };

  addListeners();

  if (config.show) {
    setTimeout(onShow, 0);
  }

  return {
    destroy() {
      removeListeners();

      if (title) {
        element.setAttribute('title', title);
      }
    }
  };
};
