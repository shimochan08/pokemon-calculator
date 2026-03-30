import { PokemonBuild } from '@/types/domain/PokemonBuild';
import { PokemonBuildRepository } from '../PokemonBuildRepository';

const KEY = 'pokemon-builds';

export const pokemonBuildLocalStorage: PokemonBuildRepository = {
  async load(buildId: string) {
    const data = localStorage.getItem(KEY);
    if (!data) return null;

    const builds = JSON.parse(data);

    return builds[buildId] ?? null;
  },

  async save(build: PokemonBuild) {
    const data = localStorage.getItem(KEY);
    const builds = data ? JSON.parse(data) : {};

    builds[build.id] = build;

    localStorage.setItem(KEY, JSON.stringify(builds));
  },
};
