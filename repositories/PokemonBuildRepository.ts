import { PokemonBuild } from "@/types/domain/PokemonBuild";

export interface PokemonBuildRepository {
    load(buildId: string): Promise<PokemonBuild | null>;
    save(build: PokemonBuild): Promise<void>;
}