interface ScreenAvailHeightProps {
  children: React.ReactNode;
}

export const ScreenAvailHeight = ({ children }: ScreenAvailHeightProps) => {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height:
          window.screen.availHeight -
          (window.outerHeight - window.innerHeight) -
          56 -
          50,
      }}
    >
      {children}
    </main>
  );
};
