import { Stack, Text } from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiContactsLine,
  RiInputMethodLine,
  RiGitMergeLine,
  RiLogoutBoxLine,
  RiPantoneLine,
  RiStore2Line,
  RiPhoneCameraLine,
  RiRefund2Fill,
} from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import useUserData from "../../../services/hooks/useUserData";
import { useEffect, useState } from "react";
import { UserType } from "../../../types/UserType";

export function SidebarNav() {
  const { user } = useUserData();
  const [u, setU] = useState({} as UserType);

  useEffect(() => {
    setU(user)
    console.log(user)
  },[user])

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        {['admin','store','worker','delivery','customer'].includes(user.role?.slug + '') && (
          <NavLink icon={RiDashboardLine} href="/painel/dashboard">
            Dashboard
          </NavLink>
        )}
        {['admin'].includes(user.role?.slug + '') && (
          <NavLink icon={RiContactsLine} href="/painel/lojas">
            Lojas
          </NavLink>
        )}
        {['store'].includes(user.role?.slug + '') && (
          <NavLink icon={BsBoxSeam} href="/painel/produtos">
            Produtos
          </NavLink>
        )}
        {['store'].includes(user.role?.slug + '') && (
          <NavLink icon={MdOutlineCategory} href="/painel/categorias">
            Categorias
          </NavLink>
        )}
        {['store'].includes(user.role?.slug + '') && (
          <NavLink  icon={RiPantoneLine} href="/painel/grupodeopcoes">
            Grupo de Opções
          </NavLink>
        )}
        {['store'].includes(user.role?.slug + '') && (
          <NavLink icon={RiPhoneCameraLine} href="/painel/banners">
            Banners
          </NavLink>
        )}
        {['admin','store'].includes(user.role?.slug + '') && (
          <NavLink icon={RiRefund2Fill} href="/painel/gateways">
            Gateways
          </NavLink>
        )}
      </NavSection>

      <NavSection title="CONFIGURAÇÕES">
        <NavLink  icon={RiInputMethodLine} href="/painel/configuracoes">
          Editar perfil
        </NavLink>
        {['store'].includes(user.role?.slug + '') && (
          <NavLink icon={RiStore2Line} href="/painel/loja">
            Editar loja
          </NavLink>
        )}

        <NavLink icon={RiLogoutBoxLine} href="/login">
          Sair
        </NavLink>
      </NavSection>
    </Stack>
  );
}
