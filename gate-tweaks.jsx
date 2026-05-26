/* Tweaks panel: switch between Loading / Password / Unlocked states
   for debugging the gate UI. */
(function () {
  const { useEffect } = React;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "gateState": "password"
  }/*EDITMODE-END*/;

  function GateTweaks() {
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

    // Skip the initial mount so we don't override the inline gate script's
    // boot flow (which honors sessionStorage and shows the password / loading
    // screens correctly). After that, react to user-driven state changes.
    const didMountRef = React.useRef(false);

    // Apply state changes to the gate imperatively.
    useEffect(() => {
      if (!didMountRef.current) {
        didMountRef.current = true;
        return;
      }
      if (!window.__gate) return;
      // Don't persist unlock when toggling via tweaks — so refresh restores the flow.
      window.__gate.setState(t.gateState, { persist: false, focus: false });
    }, [t.gateState]);

    return (
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Gate UI">
          <window.TweakRadio
            label="State"
            value={t.gateState}
            onChange={(v) => setTweak("gateState", v)}
            options={[
              { value: "loading",  label: "Loading" },
              { value: "password", label: "Password" },
              { value: "unlocked", label: "Portfolio" }
            ]}
          />
          <window.TweakButton
            label="Replay boot flow"
            onClick={() => {
              if (window.__gate) window.__gate.clearSession();
              setTweak("gateState", "loading");
              // Simulate the boot flow: loading → password after ~900ms
              setTimeout(() => setTweak("gateState", "password"), 1000);
            }}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    );
  }

  // Mount into its own root so it doesn't interfere with the main #root app.
  const mount = document.createElement("div");
  mount.id = "gate-tweaks-root";
  document.body.appendChild(mount);
  ReactDOM.createRoot(mount).render(<GateTweaks />);
})();
