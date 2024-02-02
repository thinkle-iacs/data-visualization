import type { ImageInfo } from "./types";

export const images: ImageInfo[] = [
  {
    filename: "The_European_Extremely_Large_Telescope.jpg",
    attribution: (
      <span className="attribution">
        By <a href="http://www.eso.org/public/images/ann12096a/">ESO</a> -{" "}
        <a
          href="https://commons.wikimedia.org/w/index.php?curid=23063248"
          className="license"
        >
          CC BY 4.0
        </a>
      </span>
    ),
    name: "Telescope",
  },
  {
    filename:
      "Chestnut-naped_antpitta_(Grallaria_nuchalis_ruficeps)_Las_Tangaras.jpg",
    attribution: (
      <span className="attribution">
        By <a href="https://sharpphotography.co.uk/">Charles J. Sharp</a> -{" "}
        <a
          href="https://commons.wikimedia.org/w/index.php?curid=136415915"
          className="license"
        >
          CC BY-SA 4.0
        </a>
      </span>
    ),
    name: "Antpitta",
  },
  {
    filename: "Gurabija_(гурабија,Qurabiya;_Cuisine_of_Serbia).jpg",
    attribution: (
      <span className="attribution">
        By{" "}
        <a href="https://commons.wikimedia.org/w/index.php?curid=127917789">
          Petar Milošević
        </a>{" "}
        -{" "}
        <a
          href="https://commons.wikimedia.org/w/index.php?curid=127917789"
          className="license"
        >
          CC BY-SA 4.0
        </a>
      </span>
    ),
    name: "Graubija Cuisine of Serbia",
  },
  {
    filename: "Jää_on_kulmunud_pallideks_(Looduse_veidrused)._05.jpg",
    attribution: (
      <span className="attribution">
        By{" "}
        <a href="https://commons.wikimedia.org/w/index.php?curid=45158700">
          Aleksandr Abrosimov
        </a>{" "}
        -{" "}
        <a
          href="https://commons.wikimedia.org/w/index.php?curid=45158700"
          className="license"
        >
          CC BY-SA 4.0
        </a>
      </span>
    ),
    name: "Ice Formations",
  },
  {
    filename: "John_Everett_Millais_-_The_Blind_Girl,_1854-56.jpg",
    attribution: (
      <span className="attribution">
        By{" "}
        <a href="https://commons.wikimedia.org/w/index.php?curid=116267918">
          John Everett Millais
        </a>{" "}
        -{" "}
        <a
          href="https://commons.wikimedia.org/w/index.php?curid=116267918"
          className="license"
        >
          Public Domain
        </a>
      </span>
    ),
    name: "The Blind Girl",
  },
  {
    filename: "Olympus_E-M1_Mark_III_Zuiko_12-100mm.jpg",
    attribution: (
      <span className="attribution">
        By{" "}
        <a href="https://commons.wikimedia.org/w/index.php?curid=107866094">
          Petar Milošević
        </a>{" "}
        -{" "}
        <a
          href="https://commons.wikimedia.org/w/index.php?curid=107866094"
          className="license"
        >
          CC BY-SA 4.0
        </a>
      </span>
    ),
    name: "Olympus Camera",
  },
  {
    filename: "Pabda_Jhaal_-_Home-_Kolkata_-_West_Bengal.jpg",
    attribution: (
      <span className="attribution">
        By{" "}
        <a href="https://commons.wikimedia.org/w/index.php?curid=103573391">
          Nilanjan Sasmal
        </a>{" "}
        -{" "}
        <a
          href="https://commons.wikimedia.org/w/index.php?curid=103573391"
          className="license"
        >
          CC BY-SA 4.0
        </a>
      </span>
    ),
    name: "Kolkata Home Cooking",
  },
  {
    filename: "Snowflake_macro_photography_1.jpg",
    attribution: (
      <span className="attribution">
        By{" "}
        <a href="https://commons.wikimedia.org/w/index.php?curid=39993014">
          Alexey Kljatov
        </a>{" "}
        -{" "}
        <a
          href="https://commons.wikimedia.org/w/index.php?curid=39993014"
          className="license"
        >
          CC BY-SA 4.0
        </a>
      </span>
    ),
    name: "Snowflake Macro",
  },
  {
    filename: "THE_VIEW_(Virtual_Reality).jpg",
    attribution: (
      <span className="attribution">
        By{" "}
        <a href="https://images.nasa.gov/details/ARC-1992-AC89-0437-6">
          Wade Sisler
        </a>{" "}
        -{" "}
        <a
          href="https://commons.wikimedia.org/w/index.php?curid=128021815"
          className="license"
        >
          Public Domain
        </a>
      </span>
    ),
    name: "Virtual Reality View",
  },
].map((i) => ({ ...i, url: `images/${i.filename}` }));
