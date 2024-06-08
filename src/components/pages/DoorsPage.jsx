// data & images
import { doorsData } from "@/data";
import magdaCatalogue from "@/assets/catalogues/Magda_doors-catalogue.pdf";
import termoplastCatalogue from "@/assets/catalogues/Termoplast_doors-catalogue.pdf";
import magdaImg from "@/assets/catalogues/magda-img.png";
import termoplastImg from "@/assets/catalogues/termoplast-img.png";

// components
import { Helmet } from "react-helmet-async";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ScrollToTopButton from "../ScrollToTopButton";
import DoorCard from "../DoorCard";

// hooks
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

// framer motion
import { motion } from "framer-motion";

// variables
const PER_PAGE = 8;

export default function DoorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("type");
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (inView) {
      setPage((page) => page + 1);
    }
  }, [inView]);

  let selectedCategoryDoors;
  if (filter === "all") {
    selectedCategoryDoors = doorsData;
  } else if (filter === "interior") {
    selectedCategoryDoors = doorsData.filter(
      (door) => door.type === "interior",
    );
  } else if (filter === "exterior") {
    selectedCategoryDoors = doorsData.filter(
      (door) => door.type === "exterior",
    );
  }

  let doorsToDisplay = selectedCategoryDoors.slice(0, page * PER_PAGE);

  return (
    <>
      <Helmet>
        <title>Вікна & Двері | Двері </title>
      </Helmet>
      <div className="mx-auto w-full max-w-[1600px] px-container-padding py-24">
        <div className="relative flex justify-between gap-1 pb-10">
          <Collapsible>
            <CollapsibleTrigger className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Ціни
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute left-0 right-0 top-12 z-10 rounded-md bg-muted-foreground p-4 pt-2 text-accent shadow-lg">
              У зв'язку з нестабільною економічною ситуацією в країні, актуальні
              ціни можна дізнатися безпосередньо у продавця-консультанта за
              номером <span className="font-semibold">+380992236426</span>.
              <p className="font-semibold">
                Дякуємо за розуміння та приносимо вибачення за незручності!
              </p>
            </CollapsibleContent>
          </Collapsible>
          <div className="flex justify-end gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setSearchParams((params) => ({ ...params, type: "all" }))
              }
              className={`${filter === "all" && "bg-background_secondary"}`}
            >
              Всі
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setSearchParams((params) => ({ ...params, type: "interior" }))
              }
              className={`${filter === "interior" && "bg-background_secondary"}`}
            >
              Міжкімнатні
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setSearchParams((params) => ({ ...params, type: "exterior" }))
              }
              className={`${filter === "exterior" && "bg-background_secondary"}`}
            >
              Вхідні
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-auto-fill-265 gap-10">
          {doorsToDisplay.map((door) => {
            return (
              <motion.div
                key={door.id}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <DoorCard door={door} />
              </motion.div>
            );
          })}
        </div>
        <div className="h-1 w-full" ref={ref}>
          <ScrollToTopButton />
        </div>
        {filter !== "interior" && <DoorsCatalogues />}
      </div>
    </>
  );
}

function DoorsCatalogues() {
  return (
    <div className="mt-20">
      <h2 className="pb-10 text-center text-2xl font-semibold">
        Більше моделей вхідних дверей представлено у каталогах:
      </h2>
      <div className="grid gap-10 md:grid-cols-2">
        <a href={magdaCatalogue} target="_blank" className="relative">
          <img
            src={magdaImg}
            alt="magda doors catalogue"
            className="rounded-md border"
          />
          <h3 className="absolute bottom-0 left-0 right-0 bg-blur px-container-padding py-4 text-2xl font-semibold">
            Каталог Magda
          </h3>
        </a>
        <a href={termoplastCatalogue} target="_blank" className="relative">
          <img
            src={termoplastImg}
            alt="termoplast doors catalogue"
            className="rounded-md border"
          />
          <h3 className="absolute bottom-0 left-0 right-0 bg-blur px-container-padding py-4 text-2xl font-semibold">
            Каталог Termoplast
          </h3>
        </a>
      </div>
    </div>
  );
}
