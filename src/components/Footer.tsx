const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-bottom-bar border-t border-gold/20 px-6 py-4 flex items-center justify-center gap-6 fixed bottom-0 left-0 w-full">

      <div className="text-xs text-muted-foreground text-amber-500 text-center mt-1 px-4">
        Models provided by{" "}
        <a
          href="https://modelviewer.lol/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent"
        >
          modelviewer.lol
        </a>
        . This website is inspired by the game{" "}
        <strong>League of Legends</strong>. I do not own any rights to the game,
        characters, or models shown here.
      </div>
      </footer>
    </>
  );
};

export default Footer;
