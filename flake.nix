{
  description = "Frieren Development Environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, ... }: let
    system = "x86_64-linux";
  in {
    devShells."${system}".default = let
      pkgs = import nixpkgs {
        inherit system;
      };
    in pkgs.mkShell {
      packages = with pkgs; [
        nodejs_20
        nodePackages.pnpm
        bun
        typescript
        nodePackages_latest.ts-node
      ];

      shellHook = ''
      '';
    };
  };
}