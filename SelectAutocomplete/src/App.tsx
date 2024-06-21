import { useState } from "react";
import SelectAutoComplete from "./components/SelectAutoComplete";
import { DataProps } from "./components/SelectAutoComplete/interface";
import { quantidadeParcelas } from "./fakeData";
import * as S from "./styles";

function App() {
  const [parcelas, setParcelas] = useState<DataProps | null>(null);
  return (
    <S.Container>
      <S.Form>
        <SelectAutoComplete
          data={quantidadeParcelas}
          value={parcelas}
          onChange={(val: DataProps | null) => setParcelas(val)}
        />
      </S.Form>
    </S.Container>
  );
}

export default App;
