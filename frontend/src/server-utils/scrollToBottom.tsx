import React from 'react';
import { useRef, useEffect } from 'react';

export function useScrollToBottomAction(container: any, callback: any, offset = 0) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      let scrollContainer =
        container === document ? document.scrollingElement : container;
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [container, offset]);
}
