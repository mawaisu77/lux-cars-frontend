import React from "react";
import Header from "../../header/index";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <>
     <div className="Backgroundimage-Privicy-loan-terms">
        <Header className="text-white" />
        <div className="hidden  lg:block">
          <div className="  w-[15.5] flex flex-col  mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
            Terms & Conditions
            </div>

            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                {" "}
                <button className="hover:text-white  ">Home</button>
              </Link>
              /<button className="hover:text-white">Terms</button>
            </div>
          </div>
        </div>
      </div>

     

      <div className="w-auto md:w-[50vw] lg:w-[44.115vw]  h-auto mx-auto pt-[6vh] pb-[6vh] text-left">
        <div className="text-left  ml-[16px] md:ml-[0vw] mr-[16px] md:mr-[1.5vw] mb-[15px] md:mb-[1vh] ">
          <h1 className="text-[30px] md:text-[1.875vw]  font-bold font-urbanist text-[#1F1F2C] mb-[10px] md:mb-[0.6vh]  ">
            Terms & Conditions
          </h1>
          <p className="text-[15px]  md:text-[0.938vw] font-normal font-urbanist text-[#737A99] mb-[5px] md:mb-[2vh]">
            Patryk Szwałek prowadzący działalność gospodarczą pod firmą BidCars
            Patryk Szwałek ze stałym miejscem wykonywania działalności
            gospodarczej w Poznaniu, przy ul. Wilczak nr 20B, lok. 40, 61-623
            Poznań, NIP: 4990650123, REGON: 321529019.
          </p>
          <ul className="list-disc  pl-[30px] md:pl-[2vw] text-[15px] md:text-[0.938vw] font-normal font-urbanist text-[#737A99] ">
            <li className="mb-[5px] md:mb-[0.6vh]">
              wszelkie domy aukcyjne działające na terenie USA, prowadzące
              SERWISY DOMÓW AUKCYJNYCH, za pośrednictwem, których organizowane
              są aukcje POJAZDÓW ujawnione w ramach SERWISU.
            </li>
            <li>
              wstępny etap licytacji wybranego przez UŻYTKOWNIKA POJAZDU w
              ramach SERWISU DOMU AUKCYJNEGO, w którym UŻYTKOWNIK jest
              reprezentowany przez BIDCARS w ramach ZLECENIA.
            </li>
          </ul>
        </div>
        <div className="text-left  ml-[16px] md:ml-[0vw] mr-[16px] md:mr-[1.5vw] mb-[10px] md:mb-[1vh] ">
          <h1 className="text-[30px] md:text-[1.875vw]  font-bold font-urbanist text-[#1F1F2C] mb-[10px] md:mb-[0.6vh] ">
            Fees and Payment.
          </h1>
          <p className="text-[15px] md:text-[0.938vw] font-normal font-urbanist text-[#737A99]  mb-[5px] md:mb-[2vh]">
            etap licytacji wybranego przez UŻYTKOWNIKA POJAZDU przeprowadzany
            przez UŻYTKOWNIKA w ramach SERWISU w warunkach symulacji w oparciu o
            dane pobierane z SERWISÓW DOMÓW AUKCYJNYCH pozwalający na
            weryfikację mocy nabywczej UŻYTKOWNIKA w odniesieniu do konkretnego
            POJAZDU, którego przejście jest warunkiem realizacji ZLECENIA
            skierowanego do BIDCARS, regulowanego przez OWZ.
          </p>
          <ul className="list-disc  pl-[30px] md:pl-[2vw] text-[15px] md:text-[0.938vw] font-normal font-urbanist text-[#737A99] ">
            <li className="mb-[5px] md:mb-[0.6vh]">
              Stany Zjednoczone Ameryki.
            </li>
            <li>Stany Zjednoczone Ameryki.</li>
          </ul>
        </div>

        <div className="text-left  ml-[16px] md:ml-[0vw] mr-[16px] md:mr-[1.5vw] mb-[15px] md:mb-[1vh]">
          <h1 className="text-[30px] md:text-[1.875vw]  font-bold font-urbanist text-[#1F1F2C] mb-[10px] md:mb-[0.6vh]  ">
            Temporary Suspension; Limiting API Requests
          </h1>
          <p className=" text-[15px]  md:text-[0.938vw]  font-normal font-urbanist text-[#737A99] mb-[5px] md:mb-[2vh]">
            usługa inna aniżeli USŁUGI ELEKTRONICZNE, w której UŻYTKOWNIK
            występuje jako ZLECENIODAWCA, a BIDCARS jako zleceniobiorca, mająca
            charakter starannego działania, o cechach zastępstwa pośredniego,
            poprzez realizację której BIDCARS podejmuje działania prowadzące do
            nabycia we własnym imieniu lecz na rzecz i na rachunek ZLECENIODAWCY
            wskazanego POJAZDU, oraz pomocy w organizacji jego frachtu do
            wybranego przez ZLECENIODAWCĘ portu docelowego, z opcjonalnym
            dostarczeniem pod wskazany adres, uregulowana przez OWZ.
          </p>
        </div>

        <div className="text-left  ml-[16px] md:ml-[0vw] mr-[16px] md:mr-[1.5vw] mb-[15px] md:mb-[1vh] ">
          <h1 className="text-[30px] md:text-[1.875vw]  font-bold font-urbanist text-[#1F1F2C] mb-[10px] md:mb-[0.6vh]">
            Accessing the Service
          </h1>
          <p className=" text-[15px]  md:text-[0.938vw]  font-normal font-urbanist text-[#737A99] mb-[5px] md:mb-[2vh]">
            może być osoba fizyczna, która ukończyła 18 lat i posiada pełną
            zdolność do czynności prawnych oraz ważny dowód osobisty lub
            paszport, oraz osoba prawna albo jednostka organizacyjna
            nieposiadająca osobowości prawnej, ale mogąca we własnym imieniu
            nabywać prawa i zaciągać zobowiązania.
          </p>

          <p className="  text-[15px]  md:text-[0.938vw]  font-normal font-urbanist text-[#737A99] mb-[5px] md:mb-[2vh]">
            może być osoba fizyczna, która ukończyła 18 lat i posiada pełną
            zdolność do czynności prawnych oraz ważny dowód osobisty lub
            paszport, oraz osoba prawna albo jednostka organizacyjna
          </p>
        </div>

        <div className="text-left  ml-[16px] md:ml-[0vw] mr-[16px] md:mr-[1.5vw] mb-[15px] md:mb-[1vh] ">
          <h1 className="text-[30px] md:text-[1.875vw]  font-bold font-urbanist text-[#1F1F2C] mb-[10px] md:mb-[0.6vh]">
            License to Access and Use Our Service and Content
          </h1>
          <p className="text-[15px]  md:text-[0.938vw]  font-normal font-urbanist text-[#737A99] mb-[5px] md:mb-[2vh]">
            nie odpowiada za aktualność prezentowanych w ramach SERWISU aukcji
            DOMÓW AUKCYJNYCH oraz zawartych w nich danych dot. POJAZDÓW, w
            szczególności zaś
          </p>
          <ul className="list-disc  pl-[30px] md:pl-[2vw] text-[15px] md:text-[0.938vw] font-normal font-urbanist text-[#737A99] ">
            <li className="mb-[5px] md:mb-[0.6vh]">
              nie odpowiada za aktualność prezentowanych w ramach SERWISU aukcji
              DOMÓW AUKCYJNYCH oraz zawartych w nich danych dot. POJAZDÓW, w
              szczególności zaś
            </li>
            <li>aukcji DOMÓW AUKCYJNYCH oraz zawartych</li>
          </ul>
        </div>

        <div className="text-left  ml-[16px] md:ml-[0vw] mr-[16px] md:mr-[1.5vw] mb-[15px] md:mb-[1vh] ">
          <h1 className="text-[30px] md:text-[1.875vw]  font-bold font-urbanist text-[#1F1F2C] mb-[10px] md:mb-[0.6vh]">
            Miscellaneous
          </h1>
          <p className=" text-[15px]  md:text-[0.938vw]  font-normal font-urbanist text-[#737A99] mb-[5px] md:mb-[2vh]">
            działa w ramach SERWISU za pomocą KONTA w wersji Basic albo wersji
            Premium.
          </p>
        </div>
      </div>
    </>
  );
};

export default Terms;
