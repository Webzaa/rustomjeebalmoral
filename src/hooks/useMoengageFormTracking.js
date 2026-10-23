import { useEffect } from "react";

/*
  Loads the client-provided /js/moengage-form-tracking.js (unmodified) once a
  form is actually in the DOM.

  That script scans the page ONCE when it runs and attaches to every <form>
  containing [name="mobile"]. In a React app the section form mounts after
  page load and the popup form only exists while the popup is open, so a plain
  <script> tag in index.html would find nothing. Injecting it on mount fixes
  that. If it runs again (popup opened later) the section form is re-attached,
  but the fire-once guard in moengage-datalayer.js (keyed on the form id)
  prevents duplicate events.
*/
export default function useMoengageFormTracking(active = true) {
  useEffect(() => {
    if (!active) return undefined;

    const s = document.createElement("script");
    s.src = `${process.env.PUBLIC_URL || ""}/js/moengage-form-tracking.js?t=${Date.now()}`;
    s.async = true;
    document.body.appendChild(s);

    return () => {
      s.remove();
    };
  }, [active]);
}
