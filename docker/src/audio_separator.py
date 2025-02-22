import logging
from spleeter.separator import Separator

# Configure logging
logging.basicConfig(level=logging.INFO)

def separate_audio(input_file, output_dir):
    logging.info(f"Starting separation for file: {input_file}")
    separator = Separator('spleeter:5stems')
    separator.separate_to_file(input_file, output_dir)
    logging.info(f"Separation completed. Output saved to: {output_dir}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        logging.error("Usage: python spleeter.py <input_file> <output_dir>")
        sys.exit(1)
    input_file = sys.argv[1]
    output_dir = sys.argv[2]
    logging.info(f"Input file: {input_file}")
    logging.info(f"Output directory: {output_dir}")
    separate_audio(input_file, output_dir)