export type TeamMember = {
  /** Key into messages under `team.members.<id>` (role, optional bio/quote). */
  id: string;
  name: string;
  image: string;
  group: "kitchen" | "front";
};

export const team: TeamMember[] = [
  {
    id: "leandra",
    name: "Leandra Freire",
    image: "/images/team-leandra.jpg",
    group: "kitchen",
  },
  {
    id: "dorisa",
    name: "Dorisa Chinita",
    image: "/images/team-dorisa.jpg",
    group: "kitchen",
  },
  {
    id: "pedro",
    name: "Pedro Maia",
    image: "/images/team-pedro.jpg",
    group: "front",
  },
];

export const memorial = {
  id: "helder",
  name: "Hélder Freire",
  image: "/images/team-helder.jpg",
  imageTogether: "/images/team-leandra-helder.jpg",
};
