# Copy apps build assets to the out folder
mkdir -p out
cp -r apps/landing/.output/public/* out

mkdir -p out/ballotready
cp -r apps/ballotready/out/* out/ballotready

mkdir -p out/partymatch
cp -r apps/partymatch/.output/public/* out/partymatch

mkdir -p out/politicalflashback
cp -r apps/politicalflashback/out/* out/politicalflashback
